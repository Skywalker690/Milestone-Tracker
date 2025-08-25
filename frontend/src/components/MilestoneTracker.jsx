import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Plus, Search, Filter, Target, CheckCircle2, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import MilestoneCard from './MilestoneCard';
import MilestoneForm from './MilestoneForm';
import { apiService } from '../services/apiService';
import { useToast } from '../hooks/use-toast';

const MilestoneTracker = () => {
  const [milestones, setMilestones] = useState([]);
  const [filteredMilestones, setFilteredMilestones] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('achieveDate');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  // Load milestones from API
  const loadMilestones = useCallback(async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      const data = await apiService.getAllMilestones();
      setMilestones(data);
      
      if (showRefreshIndicator) {
        toast({
          title: "Success",
          description: "Milestones refreshed successfully",
        });
      }
    } catch (error) {
      console.error('Error loading milestones:', error);
      setError(error.message);
      toast({
        title: "Error",
        description: `Failed to load milestones: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [toast]);

  // Load milestones on component mount
  useEffect(() => {
    loadMilestones();
  }, [loadMilestones]);

  // Filter and sort milestones
  useEffect(() => {
    let filtered = [...milestones];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(milestone =>
        milestone.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        milestone.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus === 'completed') {
      filtered = filtered.filter(milestone => milestone.completed);
    } else if (filterStatus === 'pending') {
      filtered = filtered.filter(milestone => !milestone.completed);
    } else if (filterStatus === 'overdue') {
      filtered = filtered.filter(milestone => 
        !milestone.completed && new Date(milestone.achieveDate) < new Date()
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'achieveDate':
          return new Date(a.achieveDate) - new Date(b.achieveDate);
        case 'status':
          if (a.completed === b.completed) {
            return new Date(a.achieveDate) - new Date(b.achieveDate);
          }
          return a.completed ? 1 : -1;
        default:
          return 0;
      }
    });

    setFilteredMilestones(filtered);
  }, [milestones, searchTerm, filterStatus, sortBy]);

  const handleCreateMilestone = async (milestoneData) => {
    try {
      const newMilestone = await apiService.createMilestone(milestoneData);
      setMilestones(prev => [...prev, newMilestone]);
      toast({
        title: "Success",
        description: "Milestone created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to create milestone: ${error.message}`,
        variant: "destructive",
      });
      throw error; // Re-throw to let form handle the error state
    }
  };

  const handleEditMilestone = async (milestoneData) => {
    try {
      const updatedMilestone = await apiService.updateMilestone(editingMilestone.id, milestoneData);
      setMilestones(prev => prev.map(m => m.id === editingMilestone.id ? updatedMilestone : m));
      toast({
        title: "Success",
        description: "Milestone updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update milestone: ${error.message}`,
        variant: "destructive",
      });
      throw error; // Re-throw to let form handle the error state
    }
  };

  const handleDeleteMilestone = async (id) => {
    if (window.confirm('Are you sure you want to delete this milestone?')) {
      try {
        await apiService.deleteMilestone(id);
        setMilestones(prev => prev.filter(m => m.id !== id));
        toast({
          title: "Success",
          description: "Milestone deleted successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to delete milestone: ${error.message}`,
          variant: "destructive",
        });
      }
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      const updatedMilestone = await apiService.toggleMilestoneComplete(id, completed);
      setMilestones(prev => prev.map(m => m.id === id ? updatedMilestone : m));
      toast({
        title: "Success",
        description: `Milestone marked as ${completed ? 'completed' : 'incomplete'}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update milestone status: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const openEditForm = (milestone) => {
    setEditingMilestone(milestone);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingMilestone(null);
  };

  const handleRefresh = () => {
    loadMilestones(true);
  };

  // Statistics
  const totalMilestones = milestones.length;
  const completedMilestones = milestones.filter(m => m.completed).length;
  const overdueMilestones = milestones.filter(m => 
    !m.completed && new Date(m.achieveDate) < new Date()
  ).length;
  const completionRate = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading milestones from server...</p>
        </div>
      </div>
    );
  }

  if (error && milestones.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Connection Error</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <Button onClick={() => loadMilestones()} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry Connection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Milestone Tracker</h1>
              <p className="text-gray-300">Track and manage your project milestones efficiently</p>
            </div>
            <Button
              onClick={handleRefresh}
              variant="outline"
              disabled={isRefreshing}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300">Total Milestones</p>
                  <p className="text-2xl font-bold text-white">{totalMilestones}</p>
                </div>
                <Target className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300">Completed</p>
                  <p className="text-2xl font-bold text-green-400">{completedMilestones}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300">Overdue</p>
                  <p className="text-2xl font-bold text-red-400">{overdueMilestones}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300">Completion Rate</p>
                  <p className="text-2xl font-bold text-blue-400">{completionRate}%</p>
                </div>
                <Clock className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row flex-1 gap-4 w-full lg:w-auto">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search milestones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-40 bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Milestones</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40 bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="achieveDate">Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={() => setIsFormOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Milestone
            </Button>
          </div>
        </div>

        {/* Milestones Grid */}
        <div className="space-y-4">
          {filteredMilestones.length > 0 ? (
            filteredMilestones.map((milestone) => (
              <MilestoneCard
                key={milestone.id}
                milestone={milestone}
                onEdit={openEditForm}
                onDelete={handleDeleteMilestone}
                onToggleComplete={handleToggleComplete}
              />
            ))
          ) : (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-12 text-center">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-300 mb-2">No milestones found</h3>
                <p className="text-gray-400 mb-4">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Get started by creating your first milestone.'
                  }
                </p>
                {!searchTerm && filterStatus === 'all' && (
                  <Button onClick={() => setIsFormOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Milestone
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Form Modal */}
        <MilestoneForm
          isOpen={isFormOpen}
          onClose={closeForm}
          onSubmit={editingMilestone ? handleEditMilestone : handleCreateMilestone}
          milestone={editingMilestone}
        />
      </div>
    </div>
  );
};

export default MilestoneTracker;