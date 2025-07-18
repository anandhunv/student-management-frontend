import { useSelector } from "react-redux"
import Header from "../components/Header"
import Card from "../components/Card"
import { STAFF_LOGO_IMAGE, STUDENT_LOGO_IMAGE } from "../utils/constants"

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
                image={STUDENT_LOGO_IMAGE}
              />
              <Card
                title="Manage Staff"
                description="Add staff and assign permissions and roles."
                link="/staffs"
                image={STAFF_LOGO_IMAGE}

              />
            </>
          )}

          {user?.role === "staff" && (
            <Card
              title="Manage Students"
              description="View student list or request edit access."
              link="/students"
                image={STAFF_LOGO_IMAGE}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
