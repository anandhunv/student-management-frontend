import { useSelector } from "react-redux"
import Header from "../components/Header"
import Card from "../components/Card"

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div>
      <Header />
      <div className="p-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {user?.role === "superAdmin" && (
            <>
              <Card
                title="Manage Students"
                description="Create, edit, and remove student records easily."
                link="/students"
                image="https://cdn-icons-png.flaticon.com/512/354/354637.png"
              />
              <Card
                title="Manage Staff"
                description="Add staff and assign permissions and roles."
                link="/staffs"
                image="https://cdn-icons-png.flaticon.com/256/4232/4232293.png"
              />
            </>
          )}

          {user?.role === "staff" && (
            <Card
              title="Manage Students"
              description="View student list or request edit access."
              link="/students"
              image="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
