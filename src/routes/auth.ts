import { Request, Response, Router } from 'express';
import { User } from '../models/UserModel';
import {
  SignUpCommand,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';

// read env vars
import { config } from 'dotenv';
config();

// Cognito

// user pool params obtained from AWS console

const poolData = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.CLIENT_ID,
};

const authRouter = Router();
// call cognito provider according to most updated docs
const client = new CognitoIdentityProviderClient({ region: 'us-east-1' });

authRouter.post('/createuser', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Signup command  for creating a new user
  const command = new SignUpCommand({
    ClientId: poolData.ClientId,
    Username: email,
    Password: password,
    UserAttributes: [{ Name: 'email', Value: email }],
  });

  const createUserInPool = await client
    .send(command)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(`You had an error : ${error}`));

  return createUserInPool;
});

authRouter.post('/confirmation', async (req: Request, res: Response) => {
  const { email, code } = req.body;

  try {
    // Confirmar el registro del usuario en Cognito
    const command = new ConfirmSignUpCommand({
      ClientId: poolData.ClientId,
      Username: email,
      ConfirmationCode: code,
    });
    // enviar confirmacion
    await client.send(command);

    // Crear usuario en base de datos
    const newUser = new User({ email });
    await newUser.save();

    res.status(200).json({
      message: `User confirmed and created in the database:${newUser}`,
    });
  } catch (error) {
    // Manejar errores
    console.error('Error confirming user:', error);
    res.status(500).json({ error: 'Error confirming user.' });
  }
});

authRouter.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const command = new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH', // enable this authflow on your aws account
    AuthParameters: {
      PASSWORD: password,
      USERNAME: email,
    },
    ClientId: poolData.ClientId,
  });

  const userLogin = await client
    .send(command)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(`You had an error : ${error}`));

  // For simple communication use the "Idtoken"  which contains useful dat alike username(email)
  return userLogin;
});

export default authRouter;
