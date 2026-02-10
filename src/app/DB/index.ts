import { User } from '../User/user.model';

const superUser = {
  "name": "Admin",
  "email": "admin@mail.com",
  "password": "123456",
  "role": "admin"
};

const seedAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isAdminExits = await User.findOne({ role: "admin" });

  if (!isAdminExits) {
    await User.create(superUser);
  }
};

export default seedAdmin;
