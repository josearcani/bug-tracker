import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db/models';
import { generateJWT } from '../helpers/generate-jwt';

export const signup = async (req: Request, res: Response) => {
  const { username, password, lName, fName, profilePic, email } = req.body;
  try {
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
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    const user = db.User.build({ username, email, password: hash, lName, fName, profilePic });
    const token = generateJWT({username, id: user.id, email});
    await user.save();
    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        lName: user.lName,
        fName: user.fName,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const login = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  try {
    let user;
    if (username) {
      user = await db.User.findOne({ where: { username } });
    } else {
      user = await db.User.findOne({ where: { email } });
    }

    if (!user) {
      return res.status(401).json({
        message: `User not found`
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: 'Invalid credentials'
      })
    }
    const token = generateJWT({ username: user.username, id: user.id, email: user.email });
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        lName: user.lName,
        fName: user.fName,
        profilePic: user.profilePic,
      },
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const google = async (req: Request, res: Response) => {
  try {
    const users = await db.User.findAll();
    console.log(users);
    res.json({users})
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}