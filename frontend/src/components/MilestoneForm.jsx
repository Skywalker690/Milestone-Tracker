import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const MilestoneForm = ({ isOpen, onClose, onSubmit, milestone = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    achieveDate: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (milestone) {
      setFormData({
        title: milestone.title || '',
        description: milestone.description || '',
        achieveDate: milestone.achieveDate ? new Date(milestone.achieveDate) : null
      });
    } else {
      setFormData({
        title: '',
        description: '',
        achieveDate: null
      });
    }
    setErrors({});
  }, [milestone, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.achieveDate) {
      newErrors.achieveDate = 'Achievement date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const submitData = {
        ...formData,
        achieveDate: formData.achieveDate ? format(formData.achieveDate, 'yyyy-MM-dd') : null
      };

      await onSubmit(submitData);
      onClose();
    } catch (error) {
      console.error('Error submitting milestone:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold">
            {milestone ? 'Edit Milestone' : 'Create New Milestone'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter milestone title"
              className={`w-full ${errors.title ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter milestone description"
              rows={3}
              className={`w-full resize-none ${errors.description ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Achievement Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    errors.achieveDate ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.achieveDate ? (
                    format(formData.achieveDate, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.achieveDate}
                  onSelect={(date) => handleChange('achieveDate', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.achieveDate && <p className="text-sm text-red-500">{errors.achieveDate}</p>}
          </div>
        </form>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            {isSubmitting ? 'Saving...' : milestone ? 'Update Milestone' : 'Create Milestone'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MilestoneForm;