import { connectToDB, user, school } from "../db";
import axios from "axios";
const adminDashbord = ({ users, schools }) => {
  const createNewUser = async () => {
    await axios.post("/api/users/new", {
      name: "Mustafa",
      email: "mustafa@m.com",
      password: "123456",
      isAdmin: false,
    });
  };

  const onCreateSchool = async () => {
    try {
      const { data } = await axios.post("/api/school/new", {
        name: "مدرس واجدو",
        director: "j8NiwUZ0taCyvfwkyuh-J",
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2> admin dashbord</h2>
      <hr />
      <div>
        <div>
          <h2>All users</h2>
          {users && users.map((u) => <p key={u._id}>{u.name}</p>)}
        </div>
        <hr />
        <p>Create new user</p>
        <button onClick={createNewUser}>Create new user </button>
        <hr />
        <div>
          <h2>create new school</h2>
          <button onClick={onCreateSchool}>Create school</button>
          <h3>Get all schools </h3>
          {schools &&
            schools.map((s) => (
              <div key={s._id}>
                <p>Name: {s.name}</p>
                <p>Director {s.director}</p>
              </div>
            ))}
          <hr />
        </div>
        <div>
          <h3>Get All students: </h3>
        </div>
      </div>
    </div>
  );
};

export default adminDashbord;

export async function getServerSideProps(ctx) {
  const { db } = await connectToDB();
  const users = await user.getUsers(db);
  const schools = await school.getSchools(db);
  return {
    props: { users, schools },
  };
}

/**
 * todo Admin tools
 *
 *
 *
 * 3- see the total schools employ
 * 4- see the total school students
 * 5- see daily Absence for students and Employees and save the resons
 *
 * 6- see students reqords and marks
 */
