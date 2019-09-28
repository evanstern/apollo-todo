import React, { useState, useEffect } from 'react';

import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Header, Button, Modal, Form } from 'semantic-ui-react';
import { Layout } from 'components/Layout';

const addTaskMutation = gql`
  mutation AddTask($name: String!) {
    addTask(task: { name: $name }) {
      _id
      name
      completed
    }
  }
`;

const allTasksQuery = gql`
  query AllTasks {
    allTasks {
      _id
      name
      completed
    }
  }
`;

interface ITask {
  _id: string;
  name: string;
  completed: boolean;
}

interface IAllTasks {
  allTasks: ITask[];
}

export const MainPage: React.FC = () => {
  const [getAllTasks, { data: tasks }] = useLazyQuery<IAllTasks>(
    allTasksQuery,
    {
      fetchPolicy: 'network-only',
    }
  );
  const [addTask, { data }] = useMutation(addTaskMutation);
  const [name, setName] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setIsModalOpen(true);
  };

  const handleClose = (): void => {
    setIsModalOpen(false);
  };

  const handleSaveNewTaskClick = async (
    event: React.MouseEvent
  ): Promise<void> => {
    event.preventDefault();
    await addTask({ variables: { name } });
    handleClose();
  };

  useEffect(() => {
    getAllTasks();
  }, [data, getAllTasks]);

  return (
    <Layout>
      <Header as="h1">Main Page</Header>
      <ul>
        {tasks &&
          tasks.allTasks.map((t: ITask) => {
            return <li key={t._id}>{t.name}</li>;
          })}
      </ul>
      <Modal
        size="tiny"
        open={isModalOpen}
        onClose={handleClose}
        trigger={
          <Button primary onClick={handleOpen}>
            Create A Todo
          </Button>
        }
      >
        <Modal.Header>Create A Todo</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field
              label="task name"
              name="name"
              control="input"
              type="text"
              onChange={(e: React.FormEvent<HTMLFormElement>): void =>
                setName(e.currentTarget.value)
              }
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={handleSaveNewTaskClick}>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    </Layout>
  );
};
