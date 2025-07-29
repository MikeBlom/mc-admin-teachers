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
  assessments: number;
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
    trackers: 12,
    assessments: 8,
    lastLogin: "May 06, 2024"
  },
  {
    id: "2",
    name: "Miss Genevieve Howe",
    status: "Suspended",
    school: "MasteryConnect (4 Mastery Levels)",
    role: "School Administrator",
    trackers: 0,
    assessments: 0,
    lastLogin: "September 10, 2013"
  },
  {
    id: "3",
    name: "Ms. Domonique Jones Goode",
    status: "Suspended",
    school: "MasteryConnect (4 Mastery Levels)",
    role: "Benchmark Facilitator, Limited District Admin",
    trackers: 5,
    assessments: 3,
    lastLogin: "August 15, 2017",
    avatar: "/lovable-uploads/afa47cad-338f-40e9-a6ad-5adac5d67db7.png"
  },
  {
    id: "4",
    name: "Multischool Middle",
    status: "Active",
    school: "PS_Middle_School (4 Mastery Levels)",
    role: "Teacher",
    trackers: 23,
    assessments: 15,
    lastLogin: "September 18, 2024"
  },
  {
    id: "5",
    name: "Miss Courtney Trammell",
    status: "Suspended",
    school: "Teachers In Transition School (4 Mastery Levels)",
    role: "School Administrator, District Item Author",
    trackers: 7,
    assessments: 4,
    lastLogin: "January 12, 2023"
  },
  {
    id: "6",
    name: "Dr. Sarah Johnson",
    status: "Active",
    school: "Lincoln Elementary School (4 Mastery Levels)",
    role: "Teacher",
    trackers: 18,
    assessments: 12,
    lastLogin: "October 15, 2024"
  },
  {
    id: "7",
    name: "Mr. David Chen",
    status: "Active",
    school: "Roosevelt High School (4 Mastery Levels)",
    role: "Department Head",
    trackers: 31,
    assessments: 22,
    lastLogin: "October 14, 2024"
  },
  {
    id: "8",
    name: "Ms. Maria Rodriguez",
    status: "Active",
    school: "Washington Middle School (4 Mastery Levels)",
    role: "Teacher",
    trackers: 14,
    assessments: 9,
    lastLogin: "October 13, 2024"
  },
  {
    id: "9",
    name: "Dr. Michael Thompson",
    status: "Suspended",
    school: "Jefferson Elementary (4 Mastery Levels)",
    role: "Principal",
    trackers: 2,
    assessments: 1,
    lastLogin: "June 20, 2024"
  },
  {
    id: "10",
    name: "Ms. Jennifer Williams",
    status: "Active",
    school: "Adams High School (4 Mastery Levels)",
    role: "Teacher",
    trackers: 19,
    assessments: 13,
    lastLogin: "October 12, 2024"
  },
  {
    id: "11",
    name: "Mr. Robert Davis",
    status: "Active",
    school: "Madison Elementary (4 Mastery Levels)",
    role: "Assistant Principal",
    trackers: 25,
    assessments: 16,
    lastLogin: "October 11, 2024"
  },
  {
    id: "12",
    name: "Dr. Lisa Anderson",
    status: "Active",
    school: "Monroe Middle School (4 Mastery Levels)",
    role: "Curriculum Coordinator",
    trackers: 29,
    assessments: 19,
    lastLogin: "October 10, 2024"
  },
  {
    id: "13",
    name: "Ms. Ashley Brown",
    status: "Suspended",
    school: "Jackson Elementary (4 Mastery Levels)",
    role: "Teacher",
    trackers: 3,
    assessments: 2,
    lastLogin: "March 15, 2024"
  },
  {
    id: "14",
    name: "Mr. Christopher Wilson",
    status: "Active",
    school: "Van Buren High School (4 Mastery Levels)",
    role: "Teacher",
    trackers: 16,
    assessments: 11,
    lastLogin: "October 09, 2024"
  },
  {
    id: "15",
    name: "Dr. Amanda Garcia",
    status: "Active",
    school: "Harrison Middle School (4 Mastery Levels)",
    role: "Technology Coordinator",
    trackers: 22,
    assessments: 14,
    lastLogin: "October 08, 2024"
  },
  {
    id: "16",
    name: "Ms. Stephanie Miller",
    status: "Active",
    school: "Tyler Elementary (4 Mastery Levels)",
    role: "Teacher",
    trackers: 13,
    assessments: 8,
    lastLogin: "October 07, 2024"
  },
  {
    id: "17",
    name: "Mr. Kevin Taylor",
    status: "Active",
    school: "Polk High School (4 Mastery Levels)",
    role: "Athletic Director",
    trackers: 8,
    assessments: 5,
    lastLogin: "October 06, 2024"
  },
  {
    id: "18",
    name: "Dr. Rachel Martinez",
    status: "Suspended",
    school: "Fillmore Middle School (4 Mastery Levels)",
    role: "Assistant Principal",
    trackers: 1,
    assessments: 0,
    lastLogin: "August 22, 2024"
  },
  {
    id: "19",
    name: "Ms. Nicole White",
    status: "Active",
    school: "Pierce Elementary (4 Mastery Levels)",
    role: "Special Education Coordinator",
    trackers: 17,
    assessments: 10,
    lastLogin: "October 05, 2024"
  },
  {
    id: "20",
    name: "Mr. Daniel Lewis",
    status: "Active",
    school: "Buchanan High School (4 Mastery Levels)",
    role: "Teacher",
    trackers: 21,
    assessments: 15,
    lastLogin: "October 04, 2024"
  },
  {
    id: "21",
    name: "Dr. Kimberly Clark",
    status: "Active",
    school: "Johnson Middle School (4 Mastery Levels)",
    role: "Principal",
    trackers: 35,
    assessments: 24,
    lastLogin: "October 03, 2024"
  },
  {
    id: "22",
    name: "Ms. Megan Harris",
    status: "Active",
    school: "Cleveland Elementary (4 Mastery Levels)",
    role: "Teacher",
    trackers: 15,
    assessments: 9,
    lastLogin: "October 02, 2024"
  },
  {
    id: "23",
    name: "Mr. Joseph Walker",
    status: "Suspended",
    school: "McKinley High School (4 Mastery Levels)",
    role: "Counselor",
    trackers: 4,
    assessments: 2,
    lastLogin: "July 18, 2024"
  },
  {
    id: "24",
    name: "Dr. Angela Young",
    status: "Active",
    school: "Roosevelt Elementary (4 Mastery Levels)",
    role: "Reading Specialist",
    trackers: 20,
    assessments: 13,
    lastLogin: "October 01, 2024"
  },
  {
    id: "25",
    name: "Ms. Laura King",
    status: "Active",
    school: "Taft Middle School (4 Mastery Levels)",
    role: "Teacher",
    trackers: 11,
    assessments: 7,
    lastLogin: "September 30, 2024"
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
