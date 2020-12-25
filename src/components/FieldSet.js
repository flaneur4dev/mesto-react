import { memo, Fragment } from "react";

function FieldSet({ inputsData }) {
  return (
    <fieldset className="popup__wrapper">
      {inputsData.map(data => (
        <Fragment key={data.id}>
          <input {...data} className="popup__input" pattern="^[^\s]+(\s.*)?$" required />
          <span className="popup__input-error" />
        </Fragment>
      ))}
    </fieldset>
  )
}

export default memo(FieldSet)
