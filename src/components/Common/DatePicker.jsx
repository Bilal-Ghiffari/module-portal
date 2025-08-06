import React, { useRef } from 'react';
import { InputGroup } from 'reactstrap';
import 'flatpickr/dist/themes/material_blue.css';
import Flatpickr from 'react-flatpickr';

import { Indonesian } from 'flatpickr/dist/l10n/id.js'; // Mengimpor locale Indonesia
// Menginisialisasi locale Indonesia
// Flatpickr.localize(Indonesian);

export default function DatePicker(props) {
  const { name, text, handleChange, value, error, touched, disabled, isClearable } = props;

  const flatpickrRef = useRef(null);

  return (
    <div className="docs-datepicker">
      <InputGroup>
        <Flatpickr
          ref={flatpickrRef}
          id="DataPicker"
          disabled={disabled}
          name={name}
          value={value}
          className={`form-control d-block ${touched && error ? 'is-invalid' : ''}`}
          placeholder={text}
          options={{
            locale: Indonesian,
            altInput: true,
            altFormat: 'd F Y',
            dateFormat: 'Y-m-d'
          }}
          onChange={(date) => handleChange({ target: { name, value: date[0] } })}
        />
        <div className="input-group-append">
          {isClearable && value ? (
            <button type="button" className="btn btn-warning docs-datepicker-trigger" onClick={() => handleChange({ target: { name, value: '' } })}>
              X
            </button>
          ) : (
            <button type="button" className="btn btn-outline-secondary docs-datepicker-trigger" disabled>
              <i className="fa fa-calendar" aria-hidden="true" />
            </button>
          )}
        </div>
      </InputGroup>
      {touched && error ? <div className="invalid-feedback d-block">{error}</div> : null}
      <div className="docs-datepicker-container" />
    </div>
  );
}
