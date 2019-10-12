import React from 'react';
import { connect } from 'react-redux';
import { checkLoading } from '../helpers';

let AlertModal = ({ isModalActive, alert, closeModal, handleDeleteAlert, loading }) => {
  return (
    <div className={isModalActive ? 'modal is-active' : 'modal'}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Do you want to delete this alert?</p>
          <button className="delete" aria-label="close" onClick={closeModal} />
        </header>
        <section className="modal-card-body">{alert.desc}</section>
        <footer className="modal-card-foot">
          <button
            className={`button is-primary  ${checkLoading(loading)}`}
            onClick={() => {
              handleDeleteAlert(alert._id);
            }}
          >
            Delete
          </button>

          <button className="button is-pulled-right" onClick={closeModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

function mapStateToProps({ loading }) {
  return { loading };
}

export default connect(mapStateToProps, null)(AlertModal);
