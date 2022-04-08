import { Request, Response } from 'express';
import { Op } from 'sequelize';
import db from '../db/models';

export const getProjects = async (req: Request, res: Response) => {
  try {
    res.json({
      message: 'get all'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const getProject = async (req: Request, res: Response) => {
  try {
    res.json({
      message: 'get one'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const postProject = async (req: Request, res: Response) => {
  try {
    res.json({
      message: 'post'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const putProject = async (req: Request, res: Response) => {
  try {
    res.json({
      message: 'put'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}

export const deleteProject = async (req: Request, res: Response) => {
  try {
    res.json({
      message: 'delete'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Contact the admin'
    });
  }
}