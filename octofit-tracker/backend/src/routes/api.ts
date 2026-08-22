import { NextFunction, Request, Response, Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/octofit';

type AsyncRouteHandler = (req: Request, res: Response) => Promise<void>;

const asyncHandler = (handler: AsyncRouteHandler) => (req: Request, res: Response, next: NextFunction) => {
  handler(req, res).catch(next);
};

const router = Router();

router.get(
  '/users/',
  asyncHandler(async (_req, res) => {
    const users = await User.find().sort({ displayName: 1 });
    res.json(users);
  }),
);

router.post(
  '/users/',
  asyncHandler(async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
  }),
);

router.get(
  '/teams/',
  asyncHandler(async (_req, res) => {
    const teams = await Team.find().populate('members').sort({ name: 1 });
    res.json(teams);
  }),
);

router.post(
  '/teams/',
  asyncHandler(async (req, res) => {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  }),
);

router.get(
  '/activities/',
  asyncHandler(async (_req, res) => {
    const activities = await Activity.find().populate('userId').sort({ activityDate: -1 });
    res.json(activities);
  }),
);

router.post(
  '/activities/',
  asyncHandler(async (req, res) => {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  }),
);

router.get(
  '/leaderboard/',
  asyncHandler(async (_req, res) => {
    const leaderboard = await LeaderboardEntry.find().populate('userId').sort({ rank: 1, score: -1 });
    res.json(leaderboard);
  }),
);

router.post(
  '/leaderboard/',
  asyncHandler(async (req, res) => {
    const leaderboardEntry = await LeaderboardEntry.create(req.body);
    res.status(201).json(leaderboardEntry);
  }),
);

router.get(
  '/workouts/',
  asyncHandler(async (_req, res) => {
    const workouts = await Workout.find().sort({ difficulty: 1, name: 1 });
    res.json(workouts);
  }),
);

router.post(
  '/workouts/',
  asyncHandler(async (req, res) => {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  }),
);

export default router;