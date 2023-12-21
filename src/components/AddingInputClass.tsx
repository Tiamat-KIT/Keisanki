import type { Component } from 'solid-js';

interface VariableInputsInterface {
  InputGenre: string;
  InputNumber: number;
  Add(): void;
  Sub(): void;
  Comp: Component;
}

export class VariableInputs implements VariableInputsInterface {
  InputGenre;
  InputNumber;
  constructor(InputGenre = '', InputNumber = 1) {
    this.InputGenre = InputGenre;
    this.InputNumber = InputNumber;
  }

  Add() {
    this.InputNumber += 1;
  }

  Sub() {
    this.InputNumber -= 1;
  }

  Comp = () => {
    return (
      <>
        {Array(this.InputNumber).map((_, index) => {
          return (
            <>
              <label>
                {this.InputGenre}-{index}
              </label>
              <input type="text" name={`${this.InputGenre}-${index}`} />
            </>
          );
        })}
      </>
    );
  };
}
