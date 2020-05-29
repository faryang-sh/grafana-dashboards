import React from 'react';
import Highlight from 'react-highlight.js';
import { ReactJSON } from '../../../../../../react-plugins-deps/components/Elements/ReactJSON/ReactJSON';
import { DATABASE } from '../Details.constants';
import { DatabasesType } from '../Details.types';

const getExample = (databaseType) => (example: any): any => {
  if (databaseType === DATABASE.mongodb) {
    return <ReactJSON key={example} json={JSON.parse(example)} />;
  }
  return (
    <Highlight key={example} language="sql">
      {example}
    </Highlight>
  );
};

interface ExampleInterface {
  fingerprint: string;
  databaseType: DatabasesType;
  // TODO: update examples interface
  examples: any[];
}
const Example = ({ fingerprint, databaseType, examples }: ExampleInterface) => (
  <div>
    {databaseType === DATABASE.postgresql ? getExample(databaseType)(fingerprint) : null}
    {/* eslint-disable-next-line max-len */}
    {databaseType !== DATABASE.postgresql && examples && examples.filter((example) => example.example).length ? examples
      .filter((example) => example.example)
      .map((example) => example.example)
      .map(getExample(databaseType)) : null}
    {/* eslint-disable-next-line max-len */}
    {databaseType !== DATABASE.postgresql && !(examples && examples.filter((example) => example.example).length) ? <pre>Sorry, no examples found for this query</pre> : null}
  </div>
);

export default Example;
