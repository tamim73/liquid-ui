import { Grid } from '@components';

interface FormProps {}
export function Form(props: FormProps) {
    return (
        <form>
            <Grid>
                <label for="firstname">
                    First name
                    <input type="text" id="firstname" name="firstname" placeholder="First name" required />
                </label>

                <label for="firstname">
                    First name
                    <input type="text" id="firstname" name="firstname" placeholder="First name" required />
                </label>
            </Grid>
        </form>
    );
}

