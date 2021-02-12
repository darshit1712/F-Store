import createDataContext from './createfstore';
//reducer add
const storeReducer = (state, action) => {

  switch (action.type) {
       case 'add_store':
         return action.payload;
      case 'add_detile':
         return {...state,detils:action.payload};
    default:
      return state;
  }
};
  
const addUser = (dispatch) => {
  return  (fname,lname,dob,image,male,female,other,email) => {
      const user={fname,lname,dob,image,male,female,other,email}
      dispatch({ type: 'add_detile' ,payload : user})
  };
};


  const addstore = (dispatch) => {
    return  (title,place,descripation,date,quest,image) => {
        const data={title,place,descripation,date,quest,image}
        dispatch({ type: 'add_store' ,payload : data});
       
    };
  };


  export const { Context, Provider } = createDataContext(
    storeReducer,
    {addstore,addUser},
    [],
  ); 