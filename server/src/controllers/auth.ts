import { Request, Response } from 'express';
import db from '../db/models';
import { generateJWT } from '../helpers/generate-jwt';

export const signup = async (req: Request, res: Response) => {
  const { username, password, lName, fName, profilePic, email } = req.body;

  const [checkEmail, checkUsername] = await Promise.all([
    db.User.findOne({ where: { username } }),
    db.User.findOne({ where: { email } }),
  ]);

  if (checkUsername) {
    return res.status(400).json({
      message: `username ${ username } is already taken`
    });
  } else if (checkEmail){
    return res.status(400).json({
      message: `email ${ email } not valid`
    });
  }
  // hash password

  
  const user = db.User.build({ username, email, password, lName, fName, profilePic });
  // save
  await user.save();
  const token = generateJWT({username, id: user.id, email});
  res.json({
    user,
    token
  })
  // try {

  // } catch (error) {
  //   console.log(error);
  // }
}

export const login = async (req: Request, res: Response) => {
  // const { username, password } = req.body;
  // // validate these data

  // const user = await db.User.findOne({ where: { username } });

  // if (!user) {
  //   return res.status(400).json({
  //     message: `User ${ username } not found`
  //   })
  // }



  try {
    const users = await db.User.findAll();
    console.log(users);
    res.json({users})
  } catch (error) {
    console.log(error);
  }
}

export const google = async (req: Request, res: Response) => {
  try {
    const users = await db.User.findAll();
    console.log(users);
    res.json({users})
  } catch (error) {
    console.log(error);
  }
}