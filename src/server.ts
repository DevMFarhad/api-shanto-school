/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import app from './app';
import config from './config';
import seedAdmin from './utils/seedAdmin';

app.listen(config.port, async () => {
    console.log(`Server running at http://localhost:${config.port}`);
    try {
        await seedAdmin();
    } catch (error: any) {
        console.error(error?.message);
    }
});
