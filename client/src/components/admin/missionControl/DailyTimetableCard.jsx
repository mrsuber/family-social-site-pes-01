import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  Chip,
  LinearProgress,
  Grid,
  Paper,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating
} from '@material-ui/core';
import {
  CheckCircle,
  RadioButtonUnchecked,
  PlayArrow,
  Cancel,
  NoteAdd,
  WatchLater,
  TrendingUp,
  CalendarToday,
  Whatshot
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { getAPI, postAPI, putAPI } from '../../../utils/fetchData';

const useStyles = makeStyles((theme) => ({
  timetableCard: {
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    color: '#fff',
    minWidth: '800px',
    margin: theme.spacing(2),
    borderRadius: theme.spacing(2),
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.spacing(1),
  },
  dateSection: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  completionSection: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  streakChip: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: '#fff',
    fontWeight: 'bold',
  },
  timeBlocksContainer: {
    maxHeight: '500px',
    overflowY: 'auto',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(255, 255, 255, 0.3)',
      borderRadius: '4px',
    },
  },
  timeBlock: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.15)',
      transform: 'translateX(4px)',
    },
  },
  timeBlockCompleted: {
    background: 'rgba(76, 175, 80, 0.3)',
    borderLeft: '4px solid #4caf50',
  },
  timeBlockInProgress: {
    background: 'rgba(255, 152, 0, 0.3)',
    borderLeft: '4px solid #ff9800',
  },
  timeBlockSkipped: {
    background: 'rgba(158, 158, 158, 0.2)',
    opacity: 0.6,
  },
  timeInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    flex: 1,
  },
  timeRange: {
    minWidth: '120px',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
  blockTitle: {
    flex: 1,
    fontSize: '1rem',
  },
  blockActions: {
    display: 'flex',
    gap: theme.spacing(0.5),
  },
  categoryChip: {
    fontSize: '0.7rem',
    height: '24px',
  },
  dailyLogSection: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  weekView: {
    display: 'flex',
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
    justifyContent: 'center',
  },
  dayChip: {
    minWidth: '60px',
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
  },
  progressBar: {
    height: '8px',
    borderRadius: '4px',
    marginTop: theme.spacing(1),
  },
}));

const DailyTimetableCard = ({ personId }) => {
  const classes = useStyles();
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [weekData, setWeekData] = useState([]);
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [blockNotes, setBlockNotes] = useState('');

  useEffect(() => {
    fetchTimetable();
    fetchWeekData();
  }, [selectedDate, personId]);

  const fetchTimetable = async () => {
    try {
      setLoading(true);
      const res = await getAPI(`timetable/${personId}/${selectedDate}`);
      if (res.data) {
        setTimetable(res.data);
      } else {
        // Create today's timetable if it doesn't exist
        await createTodayTimetable();
      }
    } catch (err) {
      console.error('Error fetching timetable:', err);
      // Try to create timetable if it doesn't exist
      await createTodayTimetable();
    } finally {
      setLoading(false);
    }
  };

  const createTodayTimetable = async () => {
    try {
      const dayOfWeek = new Date(selectedDate).getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      const res = await postAPI('timetable', {
        personId,
        date: selectedDate,
        dayType: isWeekend ? 'weekend' : 'weekday',
      });

      if (res.data) {
        setTimetable(res.data);
      }
    } catch (err) {
      console.error('Error creating timetable:', err);
    }
  };

  const fetchWeekData = async () => {
    try {
      const startOfWeek = getStartOfWeek(selectedDate);
      const res = await getAPI(`timetable/${personId}/week/${startOfWeek}`);
      setWeekData(res.data || []);
    } catch (err) {
      console.error('Error fetching week data:', err);
      setWeekData([]);
    }
  };

  const getStartOfWeek = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    const monday = new Date(date.setDate(diff));
    return monday.toISOString().split('T')[0];
  };

  const updateTimeBlock = async (blockId, updates) => {
    try {
      const res = await putAPI(`timetable/${timetable.id}/block/${blockId}`, updates);
      if (res.data) {
        setTimetable(res.data);
      }
    } catch (err) {
      console.error('Error updating time block:', err);
    }
  };

  const handleBlockComplete = (block) => {
    updateTimeBlock(block.id, {
      completed: true,
      status: 'completed',
      completedAt: new Date().toISOString(),
    });
  };

  const handleBlockStart = (block) => {
    updateTimeBlock(block.id, {
      status: 'in_progress',
    });
  };

  const handleBlockSkip = (block) => {
    updateTimeBlock(block.id, {
      skipped: true,
      status: 'skipped',
    });
  };

  const handleAddNotes = (block) => {
    setSelectedBlock(block);
    setBlockNotes(block.notes || '');
    setShowNotesDialog(true);
  };

  const handleSaveNotes = async () => {
    if (selectedBlock) {
      await updateTimeBlock(selectedBlock.id, {
        notes: blockNotes,
      });
      setShowNotesDialog(false);
      setSelectedBlock(null);
      setBlockNotes('');
    }
  };

  const updateDailyLog = async (field, value) => {
    try {
      const res = await putAPI(`timetable/${timetable.id}`, {
        [field]: value,
      });
      if (res.data) {
        setTimetable(res.data);
      }
    } catch (err) {
      console.error('Error updating daily log:', err);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'rest': '#9c27b0',
      'client-work': '#f44336',
      'subercraftex': '#2196f3',
      'spiritual': '#4caf50',
      'business-development': '#ff9800',
      'personal': '#e91e63',
      'break': '#607d8b',
      'content-creation': '#00bcd4',
    };
    return colors[category] || '#757575';
  };

  const calculateCompletion = () => {
    if (!timetable || !timetable.timeBlocks) return 0;
    const completed = timetable.timeBlocks.filter(b => b.completed).length;
    return Math.round((completed / timetable.timeBlocks.length) * 100);
  };

  const getTimeBlockClass = (block) => {
    if (block.completed) return classes.timeBlockCompleted;
    if (block.status === 'in_progress') return classes.timeBlockInProgress;
    if (block.skipped) return classes.timeBlockSkipped;
    return '';
  };

  if (loading) {
    return (
      <Card className={classes.timetableCard}>
        <CardContent>
          <Typography>Loading timetable...</Typography>
          <LinearProgress />
        </CardContent>
      </Card>
    );
  }

  if (!timetable) {
    return (
      <Card className={classes.timetableCard}>
        <CardContent>
          <Typography>No timetable found for this date.</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={createTodayTimetable}
            style={{ marginTop: 16 }}
          >
            Create Timetable
          </Button>
        </CardContent>
      </Card>
    );
  }

  const completion = calculateCompletion();

  return (
    <>
      <Card className={classes.timetableCard}>
        <CardContent>
          {/* Header */}
          <Box className={classes.header}>
            <Box className={classes.dateSection}>
              <WatchLater />
              <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
              <Chip
                label={timetable.dayType === 'weekday' ? 'Weekday' : 'Weekend'}
                size="small"
                style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#fff' }}
              />
            </Box>

            <Box className={classes.completionSection}>
              <Chip
                icon={<Whatshot />}
                label="5 days streak"
                className={classes.streakChip}
              />
              <Box style={{ textAlign: 'center' }}>
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                  {completion}%
                </Typography>
                <Typography variant="caption">
                  {timetable.timeBlocks?.filter(b => b.completed).length || 0}/{timetable.timeBlocks?.length || 0} blocks
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Progress Bar */}
          <LinearProgress
            variant="determinate"
            value={completion}
            className={classes.progressBar}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />

          {/* Time Blocks */}
          <Box className={classes.timeBlocksContainer}>
            {timetable.timeBlocks && timetable.timeBlocks.map((block) => (
              <Paper
                key={block.id}
                className={`${classes.timeBlock} ${getTimeBlockClass(block)}`}
                elevation={2}
              >
                <Box className={classes.timeInfo}>
                  <Typography className={classes.timeRange}>
                    {block.startTime} - {block.endTime}
                  </Typography>
                  <Typography className={classes.blockTitle}>
                    {block.title}
                  </Typography>
                  <Chip
                    label={block.duration}
                    size="small"
                    className={classes.categoryChip}
                  />
                  <Chip
                    label={block.category}
                    size="small"
                    className={classes.categoryChip}
                    style={{ backgroundColor: getCategoryColor(block.category) }}
                  />
                </Box>

                <Box className={classes.blockActions}>
                  {!block.completed && !block.skipped && (
                    <>
                      {block.status !== 'in_progress' && (
                        <Tooltip title="Start">
                          <IconButton
                            size="small"
                            onClick={() => handleBlockStart(block)}
                            style={{ color: '#ff9800' }}
                          >
                            <PlayArrow />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Complete">
                        <IconButton
                          size="small"
                          onClick={() => handleBlockComplete(block)}
                          style={{ color: '#4caf50' }}
                        >
                          <CheckCircle />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Skip">
                        <IconButton
                          size="small"
                          onClick={() => handleBlockSkip(block)}
                          style={{ color: '#9e9e9e' }}
                        >
                          <Cancel />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                  <Tooltip title="Add Notes">
                    <IconButton
                      size="small"
                      onClick={() => handleAddNotes(block)}
                      style={{ color: '#fff' }}
                    >
                      <NoteAdd />
                    </IconButton>
                  </Tooltip>
                  {block.completed && <CheckCircle style={{ color: '#4caf50' }} />}
                  {block.skipped && <Typography variant="caption" style={{ opacity: 0.7 }}>SKIPPED</Typography>}
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Daily Log Section */}
          <Box className={classes.dailyLogSection}>
            <Typography variant="h6" gutterBottom>
              Daily Log
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="What I accomplished today"
                  variant="outlined"
                  value={timetable.accomplishments || ''}
                  onChange={(e) => updateDailyLog('accomplishments', e.target.value)}
                  InputProps={{ style: { color: '#fff' } }}
                  InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Challenges faced"
                  variant="outlined"
                  value={timetable.challenges || ''}
                  onChange={(e) => updateDailyLog('challenges', e.target.value)}
                  InputProps={{ style: { color: '#fff' } }}
                  InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Tomorrow's priority"
                  variant="outlined"
                  value={timetable.tomorrowPriority || ''}
                  onChange={(e) => updateDailyLog('tomorrowPriority', e.target.value)}
                  InputProps={{ style: { color: '#fff' } }}
                  InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography>Energy Level:</Typography>
                  <Rating
                    value={timetable.energyLevel || 3}
                    onChange={(event, newValue) => {
                      updateDailyLog('energyLevel', newValue);
                    }}
                    max={5}
                  />
                  <Typography>Adherence Score: {timetable.adherenceScore || 0}%</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Week View */}
          <Box className={classes.weekView}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const dayData = weekData[index];
              return (
                <Chip
                  key={day}
                  label={`${day}\n${dayData?.overallCompletion || 0}%`}
                  className={classes.dayChip}
                  onClick={() => {
                    const weekStart = getStartOfWeek(selectedDate);
                    const targetDate = new Date(weekStart);
                    targetDate.setDate(targetDate.getDate() + index);
                    setSelectedDate(targetDate.toISOString().split('T')[0]);
                  }}
                />
              );
            })}
          </Box>
        </CardContent>
      </Card>

      {/* Notes Dialog */}
      <Dialog open={showNotesDialog} onClose={() => setShowNotesDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedBlock?.title} - Notes
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={blockNotes}
            onChange={(e) => setBlockNotes(e.target.value)}
            placeholder="Add notes about this time block..."
            variant="outlined"
            style={{ marginTop: 8 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNotesDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveNotes} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DailyTimetableCard;
