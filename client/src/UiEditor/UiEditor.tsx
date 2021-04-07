import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import { Editor, Frame, Element } from '@craftjs/core';
import { Container, Button, Text, userComponents } from './user';
import { Topbar, Toolbox, SettingsPanel, UiPreview, RenderNode } from './components';
import { PHONE_WIDTHS } from './constants';

// IMPORTANT: we need to set document object on mobile in order to not crash the page preview functionality (craftjs fix)
if (Platform.OS === 'android' || Platform.OS === 'ios') {
  // @ts-ignore
  document = {
    querySelector: () => {},
  };
}

interface UiEditorProps {
  preview: boolean;
  pageName: string;
  json?: string;
  onPressSave?: (serializedJson: string) => void;
  onPressGenerateCode?: (serializedJson: string) => void;
}

export default function UiEditor(props: UiEditorProps) {
  const [phoneWidth, setPhoneWidth] = useState<number>(PHONE_WIDTHS[0].value);

  return (
    <Editor enabled={!props.preview} resolver={userComponents} onRender={RenderNode}>
      {props.preview ? (
        <Frame data={props.json}>
          <Element is={Container} canvas>
            <Button />
            <Text />
          </Element>
        </Frame>
      ) : (
        <View style={{ flex: 1 }}>
          <Topbar
            pageName={props.pageName}
            phoneWidth={phoneWidth}
            setPhoneWidth={setPhoneWidth}
            onPressSave={props.onPressSave}
            onPressGenerateCode={props.onPressGenerateCode}
          />
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Toolbox />
            <UiPreview json={props.json} phoneWidth={phoneWidth} />
            <SettingsPanel />
          </View>
        </View>
      )}
    </Editor>
  );
}

UiEditor.defaultProps = {
  preview: false,
  pageName: '',
};
