import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Pencil, Trash2 } from 'lucide-react';

const TeacherCourseCard = ({
  course,
  onEdit,
  onDelete,
  isOwner,
}: TeacherCourseCardProps) => {
  return (
    <Card className="course-card-teacher group">
      <CardHeader className="course-card-teacher__header">
        {course.image && (
          <Image
            src={course.image}
            alt={course.title}
            width={370}
            height={200}
            className="course-card-teacher__image"
          />
        )}
      </CardHeader>

      <CardContent className="course-card-teacher__content">
        <div className="flex flex-col">
          <CardTitle className="course-card-teacher__title">
            {course.title}
          </CardTitle>
          <CardDescription className="course-card-teacher__category text-gray-400">
            {course.category}
          </CardDescription>

          <p className="mb-2 text-sm">
            Status:
            <span
              className={cn(
                'rounded px-2 py-1 font-semibold',
                course.status === 'Published'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              )}
            >
              {course.status}
            </span>
          </p>
          {course.enrollments && (
            <p className="ml-1 mt-1 inline-block text-sm font-medium text-gray-400">
              <span className="font-bold text-white-100">
                {course.enrollments.length}
              </span>{' '}
              Student{course.enrollments.length > 1 ? 's' : ''} Enrolled
            </p>
          )}
        </div>

        <div className="mt-3 flex w-full gap-2">
          {isOwner ? (
            <>
              <div className="">
                <Button
                  className="course-card-teacher__edit-button"
                  variant="outline"
                  onClick={() => onEdit(course)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Course
                </Button>
              </div>
              <div className="">
                <Button
                  className="course-card-teacher__delete-button"
                  variant="destructive"
                  onClick={() => onDelete(course)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Course
                </Button>
              </div>
            </>
          ) : (
            <p className="text-sm italic text-gray-500">View Only</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherCourseCard;
