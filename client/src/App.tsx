// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider, Text } from '@mantine/core';

export default function App() {
  return (
    <>
      <MantineProvider>
        {/* Your app here */}
        <Text>Test</Text>
      </MantineProvider>
    </>
  )
}