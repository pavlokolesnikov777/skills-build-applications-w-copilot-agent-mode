import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/octofit';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [trailblazers, kettlebellKings] = await Team.create([
      { name: 'Trailblazers', mascot: 'Falcon', members: [] },
      { name: 'Kettlebell Kings', mascot: 'Lion', members: [] },
    ]);

    const [maya, jordan, priya, theo] = await User.create([
      {
        username: 'maya_runner',
        email: 'maya.runner@example.com',
        displayName: 'Maya Chen',
        teamId: trailblazers._id,
      },
      {
        username: 'jordan_lifts',
        email: 'jordan.lifts@example.com',
        displayName: 'Jordan Ellis',
        teamId: kettlebellKings._id,
      },
      {
        username: 'priya_cycles',
        email: 'priya.cycles@example.com',
        displayName: 'Priya Nair',
        teamId: trailblazers._id,
      },
      {
        username: 'theo_rows',
        email: 'theo.rows@example.com',
        displayName: 'Theo Morgan',
        teamId: kettlebellKings._id,
      },
    ]);

    await Promise.all([
      Team.findByIdAndUpdate(trailblazers._id, { members: [maya._id, priya._id] }),
      Team.findByIdAndUpdate(kettlebellKings._id, { members: [jordan._id, theo._id] }),
    ]);

    await Activity.create([
      {
        userId: maya._id,
        type: 'Outdoor run',
        durationMinutes: 42,
        caloriesBurned: 430,
        activityDate: new Date('2026-08-18T07:30:00Z'),
      },
      {
        userId: jordan._id,
        type: 'Strength training',
        durationMinutes: 55,
        caloriesBurned: 510,
        activityDate: new Date('2026-08-18T18:15:00Z'),
      },
      {
        userId: priya._id,
        type: 'Cycling',
        durationMinutes: 68,
        caloriesBurned: 620,
        activityDate: new Date('2026-08-19T06:45:00Z'),
      },
      {
        userId: theo._id,
        type: 'Rowing intervals',
        durationMinutes: 36,
        caloriesBurned: 390,
        activityDate: new Date('2026-08-19T12:00:00Z'),
      },
    ]);

    await LeaderboardEntry.create([
      { userId: priya._id, score: 1840, rank: 1 },
      { userId: jordan._id, score: 1710, rank: 2 },
      { userId: maya._id, score: 1665, rank: 3 },
      { userId: theo._id, score: 1495, rank: 4 },
    ]);

    await Workout.create([
      {
        name: 'Morning Mobility Reset',
        description: 'A gentle full-body mobility session for active recovery days.',
        difficulty: 'beginner',
        durationMinutes: 20,
        targetMuscleGroups: ['hips', 'shoulders', 'core'],
      },
      {
        name: 'Tempo Run Builder',
        description: 'A steady aerobic run with short tempo blocks to build endurance.',
        difficulty: 'intermediate',
        durationMinutes: 45,
        targetMuscleGroups: ['quadriceps', 'hamstrings', 'calves'],
      },
      {
        name: 'Power Circuit',
        description: 'A high-intensity strength circuit focused on compound movement patterns.',
        difficulty: 'advanced',
        durationMinutes: 50,
        targetMuscleGroups: ['glutes', 'back', 'chest', 'core'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
