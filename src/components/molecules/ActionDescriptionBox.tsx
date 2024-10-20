import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { PaginationType, useActionContext, LimitType } from '../../context/browserActions';
import { Typography, FormControlLabel, Checkbox, Box } from '@mui/material';

const CustomBoxContainer = styled.div`
  position: relative;
  min-width: 250px;
  width: auto; 
  min-height: 100px;
  height: auto;
  border: 2px solid #ff00c3;
  background-color: white;
  margin: 30px 15px;
`;

const Triangle = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid #ff00c3;
`;

const Content = styled.div`
  padding: 20px;
  text-align: left;
`;

const ActionDescriptionBox = () => {
  const { getText, getScreenshot, getList, captureStage } = useActionContext();

  const messages = [
    {
      stage: 'initial' as const,
      text: 'Select the list you want to extract along with the texts inside it',
    },
    {
      stage: 'pagination' as const,
      text: 'Select how the robot can capture the rest of the list',
    },
    {
      stage: 'limit' as const,
      text: 'Choose the number of items to extract',
    },
    {
      stage: 'complete' as const,
      text: 'Capture is complete',
    },
  ];

  const renderActionDescription = () => {
    if (getText) {
      return (
        <>
          <Typography variant="subtitle2" gutterBottom>Capture Text</Typography>
          <Typography variant="body2" gutterBottom>Hover over the texts you want to extract and click to select them</Typography>
        </>
      )
    } else if (getScreenshot) {
      return (
        <>
          <Typography variant="subtitle2" gutterBottom>Capture Screenshot</Typography>
          <Typography variant="body2" gutterBottom>Capture a partial or full page screenshot of the current page. </Typography>
        </>
      )
    } else if (getList) {
      return (
        <>
          <Typography variant="subtitle2" gutterBottom>Capture List</Typography>
          <Typography variant="body2" gutterBottom>
            Hover over the list you want to extract. Once selected, you can hover over all texts inside the list you selected. Click to select them.
          </Typography>
          <Box>
            {messages.map(({ stage, text }, index) => (
              <FormControlLabel
                key={stage}
                control={
                  <Checkbox
                    checked={
                      (stage === 'initial' && captureStage !== '') || // Checked if captureStage is at least 'initial'
                      (stage === 'pagination' && (captureStage === 'pagination' || captureStage === 'limit' || captureStage === 'complete')) || // captureStage is at least 'pagination'
                      (stage === 'limit' && (captureStage === 'limit' || captureStage === 'complete')) || // captureStage is at least 'limit'
                      (stage === 'complete' && captureStage === 'complete') // captureStage is 'complete'
                    }
                    disabled
                  />
                }
                label={
                  <Typography variant="body2" gutterBottom>{text}</Typography>
                }
              />
            ))}
          </Box>
        </>
      );
    } else {
      return (
        <>
          <Typography variant="subtitle2" gutterBottom>What data do you want to extract?</Typography>
          <Typography variant="body2" gutterBottom>A robot is designed to perform one action at a time. You can choose any of the options below.</Typography>
        </>
      )
    }
  }

  return (
    <CustomBoxContainer>
      <Triangle />
      <Content>
        {renderActionDescription()}
      </Content>
    </CustomBoxContainer>
  );
};

export default ActionDescriptionBox;