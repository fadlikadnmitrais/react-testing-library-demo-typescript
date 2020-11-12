import * as React from 'react';
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react';
import Index from '../../../components/home/Index';

let documentBody: RenderResult;

describe('<Index/>', () => {
  beforeEach(() => {
    // Arrange
    documentBody = render(<Index/>);
  });
  it('shows initial messages', () => {
    // Assert
    const welcome = documentBody.getByText("Welcome to Pokemon world!");
    const readMores = documentBody.getAllByText("Read more...");
    expect(welcome).toBeInTheDocument();
    expect(readMores.length).toEqual(2);
  });

  it('shows full texts when read more is clicked', () => {
    const readMores = documentBody.getAllByText('Read more...');

    const firstDesc = 'You can check pokemons in Pokedex page';
    expect(documentBody.queryByText(firstDesc, { exact: false})).not.toBeInTheDocument();

    // Act and Assert
    fireEvent.click(readMores[0]);
    expect(documentBody.queryByText(firstDesc, { exact: false})).toBeInTheDocument();

    const secondDesc = 'also collectively refers to the 896 fictional';
    expect(documentBody.queryByText(secondDesc, { exact: false})).not.toBeInTheDocument();

    //Act and Assert
    fireEvent.click(readMores[1]);
    expect(documentBody.queryByText(secondDesc, { exact: false})).toBeInTheDocument();
  });

  // it('shows full text async', async() => {
  //   const readMores = documentBody.getAllByText('Read more...');
  //
  //   // Act and Assert
  //   const before = documentBody.queryByText('You can');
  //   expect(before).not.toBeInTheDocument();
  //
  //   fireEvent.click(readMores[0]);
  //
  //   await waitFor(() => {
  //     const after = documentBody.queryByText('You can');
  //     expect(after).toBeInTheDocument();
  //   });
  // });
});
