import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, LogIn, Edit3, Pause, Trash2, RotateCcw } from "lucide-react";

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

interface TeacherCardProps {
  teacher: Teacher;
  onLogin: (id: string) => void;
  onEdit: (id: string) => void;
  onSuspend: (id: string) => void;
  onUnsuspend: (id: string) => void;
  onDelete: (id: string) => void;
  onResetPassword: (id: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 border-green-200";
    case "Suspended":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const TeacherCard = ({ 
  teacher, 
  onLogin, 
  onEdit, 
  onSuspend, 
  onUnsuspend, 
  onDelete, 
  onResetPassword 
}: TeacherCardProps) => {
  const initials = teacher.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Avatar and basic info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="h-12 w-12 shrink-0">
              <AvatarImage src={teacher.avatar} alt={`${teacher.name} profile picture`} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{teacher.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={getStatusColor(teacher.status)}>
                  {teacher.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Details - responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 flex-1">
            <div>
              <p className="text-sm text-muted-foreground">School</p>
              <p className="text-sm font-medium truncate" title={teacher.school}>
                {teacher.school}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="text-sm font-medium">{teacher.role}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Last Login</p>
              <p className="text-sm font-medium">{teacher.lastLogin}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onResetPassword(teacher.id)}
              className="text-xs"
            >
              Reset Password
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={`Actions for ${teacher.name}`}>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onLogin(teacher.id)}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(teacher.id)}>
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {teacher.status === "Active" ? (
                  <DropdownMenuItem 
                    onClick={() => onSuspend(teacher.id)}
                    className="text-warning"
                  >
                    <Pause className="mr-2 h-4 w-4" />
                    Suspend
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem 
                    onClick={() => onUnsuspend(teacher.id)}
                    className="text-success"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Unsuspend
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => onDelete(teacher.id)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherCard;