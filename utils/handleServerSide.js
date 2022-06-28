const handleServerSide = {
  handleRedirectServerSide: async () => {
    // return {
    //   redirect: {
    //     permanent: false,
    //     destination: '',
    //   },
    // };
    return {
      redirect: null,
    };
  },

  handleGetPropsServerSide: async ()=> {
    return {};
  },
};

export default handleServerSide;
