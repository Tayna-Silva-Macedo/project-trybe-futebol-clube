import IMatch from '../interfaces/IMatch';

const calculateVictories = (matches: IMatch[], teamId: number): number => {
  const victories = matches.reduce((acc, match) => {
    if (
      match.homeTeam === teamId
      && match.homeTeamGoals > match.awayTeamGoals
    ) {
      return acc + 1;
    }

    if (
      match.awayTeam === teamId
      && match.awayTeamGoals > match.homeTeamGoals
    ) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return victories;
};

const calculateDraws = (matches: IMatch[], teamId: number): number => {
  const draws = matches.reduce((acc, match) => {
    if (
      match.homeTeam === teamId
      && match.homeTeamGoals === match.awayTeamGoals
    ) {
      return acc + 1;
    }

    if (
      match.awayTeam === teamId
      && match.awayTeamGoals === match.homeTeamGoals
    ) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return draws;
};

const calculateLosses = (matches: IMatch[], teamId: number) => {
  const losses = matches.reduce((acc, match) => {
    if (
      match.homeTeam === teamId
      && match.homeTeamGoals < match.awayTeamGoals
    ) {
      return acc + 1;
    }

    if (
      match.awayTeam === teamId
      && match.awayTeamGoals < match.homeTeamGoals
    ) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return losses;
};

const calculatePoints = (matches: IMatch[], teamId: number): number => {
  const totalVictories = calculateVictories(matches, teamId);
  const totalDraws = calculateDraws(matches, teamId);

  const points = totalVictories * 3 + totalDraws * 1;

  return points;
};

const calculateGames = (matches: IMatch[], teamId: number): number => {
  const games = matches.reduce((acc, match) => {
    if (match.homeTeam === teamId || match.awayTeam === teamId) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return games;
};

const calculateGoalsFavor = (matches: IMatch[], teamId: number): number => {
  const goalsFavor = matches.reduce((acc, match) => {
    if (match.homeTeam === teamId) {
      return acc + match.homeTeamGoals;
    }

    if (match.awayTeam === teamId) {
      return acc + match.awayTeamGoals;
    }

    return acc;
  }, 0);

  return goalsFavor;
};

const calculateGoalsOwn = (matches: IMatch[], teamId: number): number => {
  const goalsOwn = matches.reduce((acc, match) => {
    if (match.homeTeam === teamId) {
      return acc + match.awayTeamGoals;
    }

    if (match.awayTeam === teamId) {
      return acc + match.homeTeamGoals;
    }

    return acc;
  }, 0);

  return goalsOwn;
};

const calculateGolsBalance = (matches: IMatch[], teamId: number): number => {
  const goalsFavor = calculateGoalsFavor(matches, teamId);
  const goalsOwn = calculateGoalsOwn(matches, teamId);

  const golsBalance = goalsFavor - goalsOwn;

  return golsBalance;
};

const calculateEfficiency = (matches: IMatch[], teamId: number): string => {
  const totalPoints = calculatePoints(matches, teamId);
  const totalGames = calculateGames(matches, teamId);

  const efficiency = (totalPoints / (totalGames * 3)) * 100;

  return efficiency.toFixed(2);
};

const generateLeaderboard = (matches: IMatch[], teamId: number) => ({
  totalPoints: calculatePoints(matches, teamId),
  totalGames: calculateGames(matches, teamId),
  totalVictories: calculateVictories(matches, teamId),
  totalDraws: calculateDraws(matches, teamId),
  totalLosses: calculateLosses(matches, teamId),
  goalsFavor: calculateGoalsFavor(matches, teamId),
  goalsOwn: calculateGoalsOwn(matches, teamId),
  goalsBalance: calculateGolsBalance(matches, teamId),
  efficiency: calculateEfficiency(matches, teamId),
});

export default generateLeaderboard;
