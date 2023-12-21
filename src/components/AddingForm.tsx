import { Component } from 'solid-js';
import { VariableInputs } from './AddingInputClass';

const Form: Component = () => {
  const AddInputs = new VariableInputs('add', 2);
  return (
    <form>
      <AddInputs.Comp />
    </form>
  );
};
export default Form;
