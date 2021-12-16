const customStyles = {
    rows: {
        style: {
          border: 'none', // override the row height
          borderRadius:5,
          backgroundColor:"#baede7",
          '&:nth-of-type(odd)': {
              backgroundColor: '#FFFFFF',
          }
        },   
    },
    headCells: {
      style: {
        border: 'none',
        
      },
    },
};

export default customStyles;