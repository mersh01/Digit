import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormComposerV2 } from '@egovernments/digit-ui-components';
import PropTypes from 'prop-types';
import { Modal, CloseSvg, Close } from "@egovernments/digit-ui-react-components";
import _ from 'lodash';

const CloseBtn = (props) => {
  return (
    <div onClick={props?.onClick} style={props?.isMobileView ? { padding: 5 } : null}>
      {props?.isMobileView ? (
        <CloseSvg />
      ) : (
        <div 
          className={"icon-bg-secondary"} 
          style={{ 
            backgroundColor: "#2513e7ff",  // Changed from #FFFFFF to lighter gray
            border: "1px solid #c3401bff",  // Added border
            borderRadius: "50%",
            padding: "8px"
          }}
        >
          <Close style={{ color: "#757575" }} />  {/* Changed to medium gray */}
        </div>
      )}
    </div>
  );
};

const ModalHeading = (props) => {
  return (
    <h1 
      className="heading-m" 
      style={{ 
        color: "#1A237E",  // Changed to deep blue
        fontWeight: "600",
        fontSize: "1.75rem"
      }}
    >
      {props.label}
    </h1>
  );
};

const PGRWorkflowModal = ({ 
  selectedAction,
  config,
  onSubmit, 
  closeModal,
  sessionFormData,
  setSessionFormData,
  clearSessionFormData,
  popupModuleActionBarStyles,
  popupModuleMianStyles 
}) => {
  const { t } = useTranslation();

  const onFormValueChange = (setValue, formData, formState, reset, setError, clearErrors, trigger, getValues) => {
    if (!_.isEqual(sessionFormData, formData)) {
      setSessionFormData({ ...sessionFormData, ...formData });
    }
  }

  if (!config || !selectedAction) return null;

  return (
    <Modal
      popupStyles={{ 
        width: "48.438rem", 
        borderRadius: "12px",  // Increased border radius
        height: "fit-content",
        border: "none",
        boxShadow: "0 10px 40px rgba(26, 35, 126, 0.2)"  // Added blue tint shadow
      }}
      headerBarMainStyle={{ 
        padding: "24px 24px 16px 24px",  // Added padding
        margin: 0,
        backgroundColor: "#F8F9FF",  // Light blue background for header
        borderBottom: "1px solid #E8EAF6"  // Subtle border
      }}
      headerBarMain={<ModalHeading style={{ fontSize: "1.5rem" }} label={t(config?.label?.heading)} />}
      actionCancelLabel={t(config.label.cancel)}
      actionCancelOnSubmit={closeModal}
      actionSaveLabel={t(config.label.submit)}
      actionSaveOnSubmit={() => onSubmit(sessionFormData)}
      headerBarEnd={<CloseBtn onClick={closeModal} />}
      formId="modal-action"
      style={{
        // Modal overlay background
        backgroundColor: "rgba(26, 35, 126, 0.5)"  // Semi-transparent blue overlay
      }}
      actionBarStyles={{
        // Footer action bar styling
        backgroundColor: "#F8F9FF",  // Light blue background
        padding: "20px 24px",
        borderTop: "1px solid #E8EAF6",
        display: "flex",
        justifyContent: "flex-end",
        gap: "16px"
      }}
      actionSaveStyles={{
        // Submit button styling
        backgroundColor: "#1A237E",  // Deep blue
        color: "white",
        border: "none",
        padding: "12px 32px",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "16px",
        transition: "all 0.3s",
        cursor: "pointer",
        ":hover": {
          backgroundColor: "#303F9F",  // Slightly lighter blue on hover
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(26, 35, 126, 0.3)"
        }
      }}
      actionCancelStyles={{
        // Cancel button styling
        backgroundColor: "white",
        color: "#1A237E",
        border: "2px solid #1A237E",
        padding: "12px 32px",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "16px",
        transition: "all 0.3s",
        cursor: "pointer",
        ":hover": {
          backgroundColor: "#F8F9FF",
          borderColor: "#303F9F",
          color: "#303F9F"
        }
      }}
    >
      <div style={{
        padding: "24px",
        backgroundColor: "white",
        maxHeight: "60vh",
        overflowY: "auto"
      }}>
        <FormComposerV2
          config={config.form}
          noBoxShadow
          inline
          childrenAtTheBottom
          onFormValueChange={onFormValueChange}
          defaultValues={sessionFormData}
          formId="modal-action"
          cardStyle={{
            // Form card styling
            border: "1px solid #E8EAF6",
            borderRadius: "8px",
            marginBottom: "16px",
            backgroundColor: "#F8F9FF"
          }}
          fieldContainerStyle={{
            // Field container styling
            padding: "16px",
            backgroundColor: "white",
            borderRadius: "6px",
            border: "1px solid #E0E0E0"
          }}
        />
      </div>
    </Modal>
  );
};

PGRWorkflowModal.propTypes = {
  selectedAction: PropTypes.shape({
    action: PropTypes.string.isRequired,
  }),
  config: PropTypes.shape({
    label: PropTypes.object.isRequired,
    form: PropTypes.array.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  popupModuleActionBarStyles: PropTypes.object,
  popupModuleMianStyles: PropTypes.object,
};

export default PGRWorkflowModal;
