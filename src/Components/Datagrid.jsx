import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core/styles';
import Data from './Data'

const useStyles = makeStyles((theme) => ({
  App:{
    backgroundColor:'rgb(133, 161, 158)', 
    borderRadius:'1rem', margin:'1rem auto',
    width:'51%', minWidth:'50rem', 
    boxShadow:'0 0 0.5rem 0.2rem rgba(0.4, 0.4, 0.4, 0.4)'
  },
  textInput:{
    fontSize:'1.1rem'
  },

}));


const ColorButton = styled(Button)(({ theme }) => ({
  }));

function Datagrid() {
  const classes = useStyles();
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("datagrid_data");
    return storedData ? JSON.parse(storedData) : [
        Data.map(({id,name,dob,occupation}) => (
          <Data key={id} name={name} dob={dob} occupation={occupation}/>
      ))
    ];
  });
  const [editIndex, setEditIndex] = useState(-1);
  const [newData, setNewData] = useState({ id: null, name: "", dob: "", occupation: "" });

  useEffect(() => {
    localStorage.setItem("datagrid_data", JSON.stringify(data));
  }, [data]);

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewData(data[index]); // Set the newData state to the data for the row being edited
  };

  const handleDelete = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleSave = (index) => {
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], ...newData };
    setData(updatedData);
    setEditIndex(-1);
    window.location.reload(false);
  };

  const handleAdd = () => {
    setNewData({ id: data.length + 1, name: "", dob: "", occupation: "" });
    setData([...data, newData]);
  };

  return (
    <div className={classes.App}>
      <h2>Table:</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Occupation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                className={classes.textInput}
                type="text"
                value={newData.name}
                onChange={(e) => setNewData({ ...newData, name: e.target.value })}
              />
            </td>
            <td>
              <input
                className={classes.textInput}
                type="date"
                value={newData.dob}
                onChange={(e) => setNewData({ ...newData, dob: e.target.value })}
              />
            </td>
            <td>
              <input
                className={classes.textInput}
                type="tex"
                value={newData.occupation}
                onChange={(e) => setNewData({ ...newData, occupation: e.target.value })}
              />
            </td>
            <td>
              <ColorButton onClick={handleAdd} variant="contained" sx={{flex: 1, backgroundColor:'blue' }}>Save</ColorButton>
            </td>
          </tr>
          {data.map((row, index) => (
            <tr key={row.id}>
              <td>{editIndex === index ? <input type="text" value={newData.name} onChange={(e) => setNewData({ ...newData, name: e.target.value })} /> : row.name}</td>
              <td>{editIndex === index ? <input type="text" value={newData.dob} onChange={(e) => setNewData({ ...newData, dob: e.target.value })} /> : row.dob}</td>
              <td>{editIndex === index ? <input type="text" value={newData.occupation} onChange={(e) => setNewData({ ...newData, occupation: e.target.value })} /> : row.occupation}</td>
              <td>
    {editIndex === index ? (
       <>
        
       <Stack spacing={2} direction="row" sx={{display:'flex', margin:'1rem'}}>
           <ColorButton onClick={() => handleSave(index)} variant="contained" sx={{flex: 1, backgroundColor:'blue' }}>Save</ColorButton>
           <ColorButton onClick={() => {setEditIndex(-1); window.location.reload(false);}} variant="contained" sx={{flex: 1, backgroundColor:'red' }}>Cancel</ColorButton>
       </Stack>
   </>
   ) : (
   <>
     <Stack spacing={2} direction="row" sx={{display:'flex', margin:'1rem'}}>
           <ColorButton onClick={() => handleEdit(index)} variant="contained" sx={{flex: 1, backgroundColor:'blue' }}>Edit</ColorButton>
           <ColorButton onClick={() => handleDelete(index)} variant="contained" sx={{flex: 1, backgroundColor:'red' }}>Delete</ColorButton>
    </Stack>
   </>
        )}
        </td>
    </tr>
))}
        </tbody>
    </table>
</div>
);};

export default Datagrid;
