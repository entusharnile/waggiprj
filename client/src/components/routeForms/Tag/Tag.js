import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import RenderField from "../../FormElements/RenderField";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { handleTagSubmit } from "../../../actions/";
import { checkLoading } from "../helpers";
import { alert } from "../helpers";
import PawLogo from "../../Misc/PawLogo";

const skip = history => {
  axios.get("/api/skip").then(({ data }) => {
    if (data.success) {
      history.push("/edit");
    } else {
      //do nothing
    }
  });
};

const submit = async (values, history, dispatch) => {
  const res = await handleTagSubmit(values, history, dispatch);
  if (res.err) {
    throw new SubmissionError({
      tag: "Invalid tag"
    });
  } else {
    history.push("/edit");
    alert();
  }
};

let Tag = ({
  error,
  handleSubmit,
  pristine,
  submitting,
  className,
  history,
  loading,
  dispatch,
  initialValues
}) => {
  const disabled = initialValues ? (initialValues.tag ? true : false) : false;
  console.log(disabled);
  return (
    <div className="tag-page">
      <div className={className ? className : "is-fullwidth"}>
        <PawLogo />

        {className && <h1>Tag</h1>}
        <form
          onSubmit={handleSubmit(values => submit(values, history, dispatch))}
        >
          <div className="form-details">
            <div className="columns">
              <Field
                disabled={disabled}
                name="tag"
                type="text"
                component={RenderField}
                label="tag"
              />
            </div>
            {error && <strong>{error}</strong>}
            <div className="columns has-text-centered">
              <div className="column">
                <button
                  type="submit"
                  disabled={submitting || pristine}
                  className={`button is-primary ${checkLoading(loading)}`}
                >
                  Save
                </button>
              </div>
              {className && (
                <div className="column">
                  <button
                    type="button"
                    className="button is-primary"
                    onClick={() => {
                      skip(history);
                    }}
                  >
                    Skip
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

Tag = reduxForm({
  form: "tag"
})(Tag);

Tag = connect(({ profile, loading }) => {
  if (profile.user) {
    return {
      initialValues: {
        tag: profile.pet[0].qr
      },
      loading: loading
    };
  }
  return {};
})(withRouter(Tag));

export default Tag;
