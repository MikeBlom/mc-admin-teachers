import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import TeacherFilters from "@/components/TeacherFilters";
import TeacherCard from "@/components/TeacherCard";
import Pagination from "@/components/Pagination";
import { Plus } from "lucide-react";

interface Teacher {
  id: string;
  name: string;
  status: "Active" | "Suspended";
  school: string;
  role: string;
  trackers: number;
  lastLogin: string;
  avatar?: string;
}

const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "Ms. Melanie Boyes",
    status: "Active",
    school: "Teachers In Transition School (4 Mastery Levels)",
    role: "School Administrator",
    trackers: 0,
    lastLogin: "May 06, 2024"
  },
  {
    id: "2",
    name: "Miss Genevieve Howe",
    status: "Suspended",
    school: "MasteryConnect (4 Mastery Levels)",
    role: "School Administrator",
    trackers: 0,
    lastLogin: "September 10, 2013"
  },
  {
    id: "3",
    name: "Ms. Domonique Jones Goode",
    status: "Suspended",
    school: "MasteryConnect (4 Mastery Levels)",
    role: "Benchmark Facilitator, Limited District Admin",
    trackers: 0,
    lastLogin: "August 15, 2017",
    avatar: "/lovable-uploads/afa47cad-338f-40e9-a6ad-5adac5d67db7.png"
  },
  {
    id: "4",
    name: "Multischool Middle",
    status: "Active",
    school: "PS_Middle_School (4 Mastery Levels)",
    role: "Teacher",
    trackers: 0,
    lastLogin: "September 18, 2024"
  },
  {
    id: "5",
    name: "Miss Courtney Trammell",
    status: "Suspended",
    school: "Teachers In Transition School (4 Mastery Levels)",
    role: "School Administrator, District Item Author",
    trackers: 0,
    lastLogin: "January 12, 2023"
  }
];

const Index = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    search: "",
    school: "all",
    gradeLevel: "all",
    subject: "all",
    role: "all",
    status: "all",
    allowTrackerCreation: true
  });

  const handleTeacherAction = (action: string, teacherId: string) => {
    const teacher = mockTeachers.find(t => t.id === teacherId);
    toast({
      title: `${action} Teacher`,
      description: `${action} action performed for ${teacher?.name}`,
    });
  };

  const handleAddTeacher = () => {
    toast({
      title: "Add Teacher",
      description: "Opening teacher creation form...",
    });
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      school: "all",
      gradeLevel: "all",
      subject: "all",
      role: "all",
      status: "all",
      allowTrackerCreation: true
    });
  };

  // Filter teachers based on current filters
  const filteredTeachers = mockTeachers.filter(teacher => {
    if (filters.search && !teacher.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.status !== "all" && teacher.status.toLowerCase() !== filters.status) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTeachers = filteredTeachers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Teachers</h1>
            <p className="text-muted-foreground mt-1">
              Manage teacher accounts, permissions, and access settings
            </p>
          </div>
          <Button onClick={handleAddTeacher} className="shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Add Teacher
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <TeacherFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Results summary */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredTeachers.length} teacher{filteredTeachers.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Teacher list */}
        <div className="space-y-4 mb-8">
          {paginatedTeachers.length > 0 ? (
            paginatedTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                onLogin={(id) => handleTeacherAction("Login", id)}
                onEdit={(id) => handleTeacherAction("Edit", id)}
                onSuspend={(id) => handleTeacherAction("Suspend", id)}
                onUnsuspend={(id) => handleTeacherAction("Unsuspend", id)}
                onDelete={(id) => handleTeacherAction("Delete", id)}
                onResetPassword={(id) => handleTeacherAction("Reset Password", id)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No teachers found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredTeachers.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredTeachers.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(newItemsPerPage) => {
              setItemsPerPage(newItemsPerPage);
              setCurrentPage(1);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
