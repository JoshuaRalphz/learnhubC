'use client'
import React from 'react'
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import Heading from '../../../app/utils/Heading';
import CreateCourse from "../../components/Admin/Course/CreateCourse";
import DashboardHeader from '../../../app/components/Admin/DashboardHeader';
import MentorSidebar from "../../components/Admin/sidebar/MentorSidebar";

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Heading
         title="Learnhub - Content"
         description="ELearning is a platform for students to learn and get help from teachers"
         keywords="Prograaming,MERN,Redux,Machine Learning"
        />
        <div className="flex">
            <div className="1500px:w-[16%] w-1/5">
                <MentorSidebar />
            </div>
            <div className="w-[85%]">
               <DashboardHeader />
               <CreateCourse /> 
            </div>
        </div>
    </div>
  )
}

export default page