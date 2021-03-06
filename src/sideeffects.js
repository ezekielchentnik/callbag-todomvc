import pipe from 'callbag-pipe';
import merge from 'callbag-merge';
import withPrevious from 'callbag-with-previous';
import forEach from 'callbag-for-each';

const patch = require('snabbdom').init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/eventlisteners').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/attributes').default
]);

export default function makeSideEffects(window, actions, view){

  pipe(
    withPrevious(view),
    forEach(([cur,prev,isFirst]) => {
      patch(isFirst ? window.document.getElementById('renderoutput') : prev, cur)
    })
  );

  pipe(
    merge(
      actions.initActions, actions.deleteActions, actions.confirmEditActions,
      actions.newTodoActions, actions.cancelEditActions
    ),
    forEach(a => window.document.querySelector(".new-todo").focus())
  );

  pipe(
    actions.editActions,
    forEach(() => window.document.querySelector(".editing .edit").focus())
  );

}
