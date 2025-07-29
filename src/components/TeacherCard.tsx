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
import { MoreHorizontal, LogIn, Edit3, Pause, Trash2, RotateCcw, KeyRound } from "lucide-react";

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
      return "bg-success/10 text-success border-success/20";
    case "Suspended":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted text-muted-foreground border-border";
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
    <Card className="hover:shadow-lg transition-all duration-200 border-border/50">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Avatar and basic info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <Avatar className="h-14 w-14 shrink-0 border-2 border-border/30">
              <AvatarImage src={teacher.avatar} alt={`${teacher.name} profile picture`} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-foreground truncate">{teacher.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={getStatusColor(teacher.status)}>
                  {teacher.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Data grid - responsive layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 flex-1">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">School</p>
              <p className="text-sm font-medium text-foreground truncate" title={teacher.school}>
                {teacher.school}
              </p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Role</p>
              <p className="text-sm font-medium text-foreground">{teacher.role}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Trackers</p>
              <p className="text-sm font-semibold text-primary">{teacher.trackers}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Assessments</p>
              <p className="text-sm font-semibold text-primary">{teacher.assessments}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Last Login</p>
              <p className="text-sm font-medium text-foreground">{teacher.lastLogin}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 lg:shrink-0">
            <Button
              onClick={() => onEdit(teacher.id)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6"
              size="sm"
            >
              <Edit3 className="mr-2 h-4 w-4" />
              Edit
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="border-border/50 hover:bg-muted"
                  aria-label={`More actions for ${teacher.name}`}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-popover border-border/50">
                <DropdownMenuItem onClick={() => onLogin(teacher.id)} className="hover:bg-accent">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login as User
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onResetPassword(teacher.id)} className="hover:bg-accent">
                  <KeyRound className="mr-2 h-4 w-4" />
                  Reset Password
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {teacher.status === "Active" ? (
                  <DropdownMenuItem 
                    onClick={() => onSuspend(teacher.id)}
                    className="text-warning hover:bg-warning/10"
                  >
                    <Pause className="mr-2 h-4 w-4" />
                    Suspend
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem 
                    onClick={() => onUnsuspend(teacher.id)}
                    className="text-success hover:bg-success/10"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Unsuspend
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => onDelete(teacher.id)}
                  className="text-destructive hover:bg-destructive/10"
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