import type { ParsedUrlQuery } from 'querystring';
import { createEvent, createStore, sample } from 'effector';
import { atom } from 'shared/factory';
import { createToggler, paramsToString } from 'shared/lib';
import { navigationModel } from 'shared/navigation';
import { genres, years } from '../config';
import { getOption } from '../lib';

export const filtersModel = atom(() => {
  const toggler = createToggler();

  const $params = createStore('');

  const $filters = createStore<Array<string | undefined>>([]);

  sample({
    clock: navigationModel.$query,
    filter: Boolean,
    fn: ({ genre, year }) => [getOption(genres, genre as string), getOption(years, year as string)],
    target: $filters,
  });

  sample({
    clock: navigationModel.$query,
    source: $filters,
    fn: (params) => paramsToString(params as string[]),
    target: $params,
  });

  const optionSelected = createEvent<ParsedUrlQuery>();

  const sendOption = createEvent<ParsedUrlQuery>();

  const $allParams = createStore<ParsedUrlQuery | null>(null).on(sendOption, (state, payload) => ({
    ...state,
    ...payload,
  }));

  const showResults = createEvent();

  /* Передаем все параметры в query только когда вызвался эвент showResults */

  sample({
    clock: showResults,
    source: $allParams,
    target: [navigationModel.pushQueryFx, toggler.close],
  });

  /* Когда что-то выбрали в селекте, сразу напрямую передаём в query */

  sample({
    clock: optionSelected,
    target: navigationModel.pushQueryFx,
  });

  return {
    toggler,
    $params,
    optionSelected,
    sendOption,
    $allParams,
    showResults,
  };
});
