import { extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
  styles: {
    global: {
      '.js-focus-visible :focus:not([data-focus-visible-added])': {
        outline: 'none',
        boxShadow: 'none',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          _disabled: {
            backgroundColor: '',
            background: '',
          },
        },
      },
      variants: {
        primary: {
          bg: '#3B49DF',
          fontSize: '14px',
          color: 'white',
          padding: '12px 16px',
        },
        secondary: {
          bg: 'white',
          color: '#475467',
          fontSize: '14px',
          padding: '12px 16px',
          border: '1px solid #E4E7EC',
        },
      },
    },
    Modal: {
      baseStyle: {
        overlay: {
          zIndex: 200,
        },
      },
    },
    Tooltip: {
      baseStyle: {
        zIndex: 100,
      },
    },
  },
});
export default theme;
