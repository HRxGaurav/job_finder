import React from 'react';

const textformater = (textToChange) =>
        textToChange.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ));

export default textformater;