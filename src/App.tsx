import type { Component } from 'solid-js';
import Container from './components/container';
import { Accordion, Dropdown, Form, Grid, Progress, Space } from '@components';
import { Button } from './components/button';

const App: Component = () => {
    return (
        <Container>
            <h1>Grid</h1>
            <Grid cols={3} gap="md" colsMd={2}>
                <img src="https://picsum.photos/400/300" alt="" />
                <img src="https://picsum.photos/400/300" alt="" />
                <img src="https://picsum.photos/400/300" alt="" />
                <img src="https://picsum.photos/400/300" alt="" />
                <img src="https://picsum.photos/400/300" alt="" />
                <img src="https://picsum.photos/400/300" alt="" />
                <img src="https://picsum.photos/400/300" alt="" />
                <img src="https://picsum.photos/400/300" alt="" />
            </Grid>

            <Space h={150} />
            <h1>From</h1>
            <Form
                fields={[
                    {
                        name: 'firstName',
                        label: 'First Name',
                        placeholder: 'Type your first name',
                        pattern: /^([^0-9]*)$/,
                        min: 2,
                        max: 10,
                        type: 'text',
                        required: true,
                    },
                ]}
            ></Form>
            <Space h={150} />
            <h1>Buttons</h1>
            <Grid cols={3} gap="md" colsMd={2}>
                <Button grow label="Primary" />
                <Button outline label="Outline" />
                <Button variant="secondary" label="Secondary" />
                <Button outline variant="secondary" label="Secondary" />
                <Button variant="danger" label="Danger" />
                <Button outline variant="danger" label="Danger" />
                <Button loading label="Loading" />
            </Grid>
            <Space h={150} />
            <h1>Progress</h1>
            <Progress value={10} indeterminate />
            <Space h={150} />

            <h1>Dropdown</h1>
            <Dropdown grow variant="outline">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </Dropdown>
            <Dropdown variant="primary">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </Dropdown>
            <Dropdown variant="secondary">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </Dropdown>
            <Dropdown variant="contrast">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </Dropdown>
            <Space h={150} />
            <h1>Progress</h1>
            <Accordion title="Outline" variant="outline">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, sapiente.
            </Accordion>
            <Accordion title="Primary" variant="primary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, sapiente.
            </Accordion>
            <Accordion title="Secondary" variant="secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, sapiente.
            </Accordion>
            <Accordion title="Contrast" variant="contrast">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, sapiente.
            </Accordion>
            <Space h={350} />
        </Container>
    );
};

export default App;
