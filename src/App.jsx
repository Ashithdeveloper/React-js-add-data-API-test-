import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Button ,InputGroup,Position,Toaster} from "@blueprintjs/core";

export const AppToaster = Toaster.create({
  position: Position.TOP,
})
 
function App() {
  const [users, setUsers] = useState([]);
  const [newName ,setNewName] = useState([]); 
  const [newEmail ,setNewEmail] = useState([]); 
  const [newWebSite ,setNewWebsite] = useState([]); 
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  },[]);
  
  /*For updata users data */
  const onChangehandle = (id, key, value) => {
    setUsers((users)=>{
      return users.map(user => {
          return user.id === id ? {...user,[key]:value} :user;
      })
    })
  }

  const updataUser = (id) =>{
          const user =users.find((user)=> user.id === id);
          fetch(`https://jsonplaceholder.typicode.com/${id}`,
      { 
        method:"POST",
        body: JSON.stringify(user),
        headers : {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }
      ).then((response)=> response.json())
      .then(
        AppToaster.show({
          message: 'User updata successfully!',
          intent: 'success',
          timeout: 3000,
        })
    
      )
    }
/*To adding users data  */
  const addUsers = () => {
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebSite.trim();
    if (name && email && website) {
      fetch("https://jsonplaceholder.typicode.com/users",
      { 
        method:"POST",
        body: JSON.stringify({
          name ,
          email,
          website,
        }),
        headers : {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }
      ).then((response)=> response.json())
      .then(data => {
        setUsers([...users, data]);
        AppToaster.show({
          message: 'User added successfully!',
          intent: 'success',
          timeout: 3000,
        })
        setNewName('');
        setNewEmail('');
        setNewWebsite('');
      })
    }
  }
  /*To delete users data */
  const deleteUser = (id) =>{
    fetch(`https://jsonplaceholder.typicode.com/${id}`,
      { 
        method:"DELETE",
      }
      ).then(()=> {
        setUsers(users.filter((user)=> user.id!== id));
        AppToaster.show({
          message: 'User deleted successfully!',
          intent: 'success',
          timeout: 3000,
        })
      })
  }
  return (
    <>
      <div className="App">
        <table>
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>website</th>
            <th>Action</th>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td
                  contentEditable="true"
                  onChange={(value) => onChangehandle(user.id, "name", value)}
                >
                  {user.name}
                </td>
                <td
                  contentEditable="true"
                  onChange={(value) => onChangehandle(user.id, "email", value)}
                >
                  {user.email}
                </td>
                <td contentEditable="true">{user.website}</td>
                <td>
                  <Button intent="primary" onClick={()=> updataUser(user.id)}>Updata</Button>
                  <Button intent="danger" onClick={()=>deleteUser(user.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td>
                <InputGroup
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter the name"
                />
              </td>
              <td>
                <InputGroup
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter the Email"
                />
              </td>
              <td>
                <InputGroup
                  value={newWebSite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                  placeholder="Enter the Website"
                />
              </td>
              <td>
                <Button intent="success" onClick={addUsers}>
                  Add Users
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default App;
