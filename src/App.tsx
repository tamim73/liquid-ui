import type { Component } from 'solid-js';
import Container from './components/container';
import { Form, Grid, Space } from '@components';


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
            <Form></Form>
        </Container>
    );
};

export default App;
