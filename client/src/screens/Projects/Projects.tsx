import React, { Component } from 'react';
import { View, FlatList, Platform } from 'react-native';
import { ListItem, Text, Button, Overlay, Input } from 'react-native-elements';
import { Layout } from '../../common';
import { ProjectType } from '../../types';

interface ProjectsProps {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  onHideError: () => void;
  projects: ProjectType[];
  onPressProject: (id: number) => void;
  onPressEdit: (id: number) => void;
  addModalVisible: boolean;
  toggleAddModalVisible: () => void;
  newProjectName: string;
  setNewProjectName: (newProjectName: string) => void;
  onPressAdd: () => void;
}

class Projects extends Component<ProjectsProps> {
  renderItem = ({ item }: { item: ProjectType }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
      <Button title='Preview' onPress={() => this.props.onPressProject(item.id)} />
      {Platform.OS === 'web' && <Button type='outline' title='Edit' onPress={() => this.props.onPressEdit(item.id)} />}
    </ListItem>
  );

  render() {
    return (
      <Layout
        loading={this.props.loading}
        hasError={this.props.hasError}
        errorMessage={this.props.errorMessage}
        onHideError={this.props.onHideError}
      >
        <FlatList
          data={this.props.projects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this.renderItem}
          ListEmptyComponent={<Text>You have no projects.</Text>}
          ListFooterComponent={
            Platform.OS === 'web' ? (
              <Button type='outline' title='Add new project' onPress={this.props.toggleAddModalVisible} />
            ) : null
          }
        />
        <Overlay isVisible={this.props.addModalVisible} onBackdropPress={this.props.toggleAddModalVisible}>
          <View>
            <Input
              placeholder='Project name'
              value={this.props.newProjectName}
              onChangeText={this.props.setNewProjectName}
            />
            <Button type='outline' title='Add' onPress={this.props.onPressAdd} />
          </View>
        </Overlay>
      </Layout>
    );
  }
}

export default Projects;