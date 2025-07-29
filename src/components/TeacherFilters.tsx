import { useState } from "react";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";

interface FilterState {
  search: string;
  school: string;
  gradeLevel: string;
  subject: string;
  role: string;
  status: string;
  allowTrackerCreation: boolean;
}

interface TeacherFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const TeacherFilters = ({ filters, onFiltersChange, onClearFilters }: TeacherFiltersProps) => {
  const updateFilter = (key: keyof FilterState, value: string | boolean) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'search') return value.trim() !== '';
    if (key === 'allowTrackerCreation') return false; // This isn't really a filter
    return value !== 'all' && value !== '';
  });

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      {/* Search and primary actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teachers..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10"
            aria-label="Search teachers"
          />
        </div>
        
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={onClearFilters}
            className="shrink-0"
            aria-label="Clear all filters"
          >
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Filter dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label htmlFor="school-filter" className="text-sm font-medium">
            School
          </Label>
          <Select 
            value={filters.school} 
            onValueChange={(value) => updateFilter('school', value)}
          >
            <SelectTrigger id="school-filter">
              <SelectValue placeholder="All Schools" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Schools</SelectItem>
              <SelectItem value="teachers-transition">Teachers In Transition School</SelectItem>
              <SelectItem value="mastery-connect">MasteryConnect</SelectItem>
              <SelectItem value="ps-middle">PS Middle School</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="grade-filter" className="text-sm font-medium">
            Grade Level
          </Label>
          <Select 
            value={filters.gradeLevel} 
            onValueChange={(value) => updateFilter('gradeLevel', value)}
          >
            <SelectTrigger id="grade-filter">
              <SelectValue placeholder="All Grades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              <SelectItem value="elementary">Elementary</SelectItem>
              <SelectItem value="middle">Middle School</SelectItem>
              <SelectItem value="high">High School</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject-filter" className="text-sm font-medium">
            Subject
          </Label>
          <Select 
            value={filters.subject} 
            onValueChange={(value) => updateFilter('subject', value)}
          >
            <SelectTrigger id="subject-filter">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="social-studies">Social Studies</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="role-filter" className="text-sm font-medium">
            Role
          </Label>
          <Select 
            value={filters.role} 
            onValueChange={(value) => updateFilter('role', value)}
          >
            <SelectTrigger id="role-filter">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="administrator">School Administrator</SelectItem>
              <SelectItem value="facilitator">Benchmark Facilitator</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status-filter" className="text-sm font-medium">
            Status
          </Label>
          <Select 
            value={filters.status} 
            onValueChange={(value) => updateFilter('status', value)}
          >
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tracker creation toggle */}
      <div className="flex items-center space-x-2 pt-2 border-t border-border">
        <Switch
          id="allow-trackers"
          checked={filters.allowTrackerCreation}
          onCheckedChange={(checked) => updateFilter('allowTrackerCreation', checked)}
        />
        <Label htmlFor="allow-trackers" className="text-sm font-medium">
          Allow teachers to create trackers
        </Label>
      </div>
    </div>
  );
};

export default TeacherFilters;