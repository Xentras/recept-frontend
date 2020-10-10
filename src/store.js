import {
    createStore,
    applyMiddleware
  } from 'redux';
  import {
    combineForms,
  } from 'react-redux-form';
  import thunk from 'redux-thunk';

  const initialRecipeState = {
    name: '',
    source: '',
    description: '',
    ingredients: [{ name: '', amount: '', unit: '' }],
    steps: [{ step: '' }],
    tags: [{ tag: '' }],
    file: '',
    previewFile: '',
  };

  // If you want your entire store to have the form state...
  const store = createStore(combineForms({
    recipe: initialRecipeState,
  }),applyMiddleware(thunk));

  export default store;