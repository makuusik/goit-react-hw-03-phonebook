import React from 'react';

const Filter = ({ value, onChange }) => (
  <label>
    Filter by name:
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Filter contacts by name"
    />
  </label>
);

export default Filter;
