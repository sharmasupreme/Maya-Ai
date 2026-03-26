/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Table as TableIcon,
  DoorOpen,
  FileText,
  Plus,
  Trash2,
  Upload,
  UserPlus,
  Search,
  ChevronRight,
  MoreVertical,
  Download,
  FileSpreadsheet,
  FileImage,
  File as FileIcon,
  MessageSquare
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { Table, Room, Menu, Staff } from '../types';

type Tab = 'overview' | 'tables' | 'rooms' | 'menus' | 'staff';

export default function Dashboard({ setView }: { setView: (v: any) => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [tables, setTables] = useState<Table[]>(
    Array.from({ length: 8 }, (_, i) => ({
      id: `t-${i + 1}`,
      number: `T-${i + 1}`,
      capacity: 4,
      status: i % 3 === 0 ? 'occupied' : 'available'
    }))
  );
  const [rooms, setRooms] = useState<Room[]>(
    Array.from({ length: 4 }, (_, i) => ({
      id: `r-${i + 1}`,
      name: `Room ${101 + i}`,
      capacity: 8,
      status: i % 2 === 0 ? 'available' : 'occupied'
    }))
  );
  const [menus, setMenus] = useState<Menu[]>([
    { id: 'm1', name: 'Main Menu', type: 'pdf', url: '#', uploadedAt: new Date().toISOString() },
    { id: 'm2', name: 'Drinks List', type: 'jpg', url: '#', uploadedAt: new Date().toISOString() },
  ]);
  const [staff, setStaff] = useState<Staff[]>([
    { id: 's1', name: 'Anil Thapa', role: 'Manager', phone: '9841234567', email: 'anil@example.com', joinedAt: '2023-01-15' },
    { id: 's2', name: 'Sita Gurung', role: 'Waitress', phone: '9841234568', email: 'sita@example.com', joinedAt: '2023-05-20' },
  ]);

  const [updates] = useState([
    { id: 1, type: 'reservation', message: 'New reservation for Table T-4 at 7:00 PM', time: '5 mins ago' },
    { id: 2, type: 'staff', message: 'Anil Thapa clocked in', time: '15 mins ago' },
    { id: 3, type: 'menu', message: 'Main Menu PDF was updated', time: '1 hour ago' },
    { id: 4, type: 'room', message: 'Room 102 is now available', time: '2 hours ago' },
  ]);

  const [revenueData] = useState([
    { day: 'Mon', revenue: 12000 },
    { day: 'Tue', revenue: 15000 },
    { day: 'Wed', revenue: 11000 },
    { day: 'Thu', revenue: 18000 },
    { day: 'Fri', revenue: 25000 },
    { day: 'Sat', revenue: 32000 },
    { day: 'Sun', revenue: 28000 },
  ]);

  const [occupancyTrend] = useState([
    { hour: '10am', tables: 2 },
    { hour: '12pm', tables: 6 },
    { hour: '2pm', tables: 4 },
    { hour: '4pm', tables: 3 },
    { hour: '6pm', tables: 7 },
    { hour: '8pm', tables: 8 },
    { hour: '10pm', tables: 5 },
  ]);

  // Bulk Actions
  const addTablesBulk = (count: number) => {
    const newTables: Table[] = Array.from({ length: count }, (_, i) => ({
      id: `t-${Date.now()}-${i}`,
      number: `T-${tables.length + i + 1}`,
      capacity: 4,
      status: 'available'
    }));
    setTables([...tables, ...newTables]);
  };

  const removeTablesBulk = () => {
    if (confirm('Are you sure you want to remove all tables?')) {
      setTables([]);
    }
  };

  const addRoomsBulk = (count: number) => {
    const newRooms: Room[] = Array.from({ length: count }, (_, i) => ({
      id: `r-${Date.now()}-${i}`,
      name: `Room ${101 + rooms.length + i}`,
      capacity: 8,
      status: 'available'
    }));
    setRooms([...rooms, ...newRooms]);
  };

  const removeRoomsBulk = () => {
    if (confirm('Are you sure you want to remove all rooms?')) {
      setRooms([]);
    }
  };

  const deleteStaff = (id: string) => {
    setStaff(staff.filter(s => s.id !== id));
  };

  const deleteMenu = (id: string) => {
    setMenus(menus.filter(m => m.id !== id));
  };

  return (
    <div className="flex h-[calc(100vh-120px)] bg-gray-50 dark:bg-black rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xl">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col p-6">
        <div className="mb-8">
          <button
            onClick={() => setView('reception')}
            className="w-full flex items-center gap-3 px-4 py-4 bg-orange-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-orange-200 dark:shadow-none hover:bg-orange-700 transition-all group mb-8"
          >
            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Try Maya AI
          </button>

          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Management</h2>
          <nav className="space-y-1">
            <SidebarItem 
              icon={LayoutDashboard} 
              label="Overview" 
              active={activeTab === 'overview'} 
              onClick={() => setActiveTab('overview')} 
            />
            <SidebarItem 
              icon={TableIcon} 
              label="Tables" 
              active={activeTab === 'tables'} 
              onClick={() => setActiveTab('tables')} 
            />
            <SidebarItem 
              icon={DoorOpen} 
              label="Rooms" 
              active={activeTab === 'rooms'} 
              onClick={() => setActiveTab('rooms')} 
            />
            <SidebarItem 
              icon={FileText} 
              label="Menus" 
              active={activeTab === 'menus'} 
              onClick={() => setActiveTab('menus')} 
            />
            <SidebarItem 
              icon={Users} 
              label="Staff" 
              active={activeTab === 'staff'} 
              onClick={() => setActiveTab('staff')} 
            />
          </nav>
        </div>
        
        <div className="mt-auto">
          {/* Settings removed as requested */}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-black p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && (
              <OverviewView 
                tables={tables} 
                rooms={rooms} 
                staff={staff} 
                menus={menus}
                updates={updates}
                revenueData={revenueData}
                occupancyTrend={occupancyTrend}
              />
            )}
            {activeTab === 'tables' && (
              <TablesView 
                tables={tables} 
                onAddBulk={() => addTablesBulk(5)} 
                onRemoveBulk={removeTablesBulk}
                onAddSingle={() => addTablesBulk(1)}
              />
            )}
            {activeTab === 'rooms' && (
              <RoomsView 
                rooms={rooms} 
                onAddBulk={() => addRoomsBulk(3)} 
                onRemoveBulk={removeRoomsBulk}
                onAddSingle={() => addRoomsBulk(1)}
              />
            )}
            {activeTab === 'menus' && (
              <MenusView 
                menus={menus} 
                onDelete={deleteMenu}
                onUpload={(name, type) => setMenus([...menus, { id: Date.now().toString(), name, type, url: '#', uploadedAt: new Date().toISOString() }])}
              />
            )}
            {activeTab === 'staff' && (
              <StaffView 
                staff={staff} 
                onDelete={deleteStaff}
                onAdd={(s) => setStaff([...staff, { ...s, id: Date.now().toString(), joinedAt: new Date().toISOString().split('T')[0] }])}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
        active 
          ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 shadow-sm' 
          : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
      }`}
    >
      <Icon className={`w-5 h-5 ${active ? 'text-orange-600' : 'text-gray-400'}`} />
      {label}
    </button>
  );
}

// Sub-Views
function OverviewView({ tables, rooms, staff, menus, updates, revenueData, occupancyTrend }: any) {
  const stats = [
    { label: 'Total Tables', value: tables.length, icon: TableIcon, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    { label: 'Total Rooms', value: rooms.length, icon: DoorOpen, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Total Staff', value: staff.length, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Total Menus', value: menus.length, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  ];

  const occupancy = {
    tables: tables.filter((t: any) => t.status === 'occupied').length,
    rooms: rooms.filter((r: any) => r.status === 'occupied').length,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Restaurant Overview</h1>
        <p className="text-sm text-gray-500">Key metrics and recent updates at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Progress Chart */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Weekly Revenue Progress</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">+12.5%</span>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#f97316" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy Trend Chart */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Daily Occupancy Trend</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="hour" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="tables" radius={[6, 6, 6, 6]} barSize={30}>
                  {occupancyTrend.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.tables > 6 ? '#ef4444' : '#f97316'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Updates */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Recent Updates</h3>
          <div className="space-y-6">
            {updates.map((update: any) => (
              <div key={update.id} className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white font-medium">{update.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{update.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Occupancy Summary */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Live Occupancy</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tables Occupied</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{occupancy.tables} / {tables.length}</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${(occupancy.tables / tables.length) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Rooms Occupied</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{occupancy.rooms} / {rooms.length}</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${(occupancy.rooms / rooms.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function TablesView({ tables, onAddBulk, onRemoveBulk, onAddSingle }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Table Management</h1>
          <p className="text-sm text-gray-500">Manage your restaurant layout and seating</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onRemoveBulk} className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-sm font-bold flex items-center gap-2 border border-red-100 dark:border-red-900/30">
            <Trash2 className="w-4 h-4" />
            Remove Bulk
          </button>
          <button onClick={onAddBulk} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700">
            <Plus className="w-4 h-4" />
            Add Bulk (5)
          </button>
          <button onClick={onAddSingle} className="px-4 py-2 bg-orange-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-orange-700 shadow-lg shadow-orange-200 dark:shadow-none">
            <Plus className="w-4 h-4" />
            New Table
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tables.map((table: Table) => (
          <div key={table.id} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-2xl">
                <TableIcon className="w-6 h-6" />
              </div>
              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                table.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}>
                {table.status}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{table.number}</h3>
            <p className="text-sm text-gray-500">Capacity: {table.capacity} Persons</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoomsView({ rooms, onAddBulk, onRemoveBulk, onAddSingle }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Room Management</h1>
          <p className="text-sm text-gray-500">Manage private cabins and dining rooms</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onRemoveBulk} className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-sm font-bold flex items-center gap-2 border border-red-100 dark:border-red-900/30">
            <Trash2 className="w-4 h-4" />
            Remove Bulk
          </button>
          <button onClick={onAddBulk} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700">
            <Plus className="w-4 h-4" />
            Add Bulk (3)
          </button>
          <button onClick={onAddSingle} className="px-4 py-2 bg-orange-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-orange-700 shadow-lg shadow-orange-200 dark:shadow-none">
            <Plus className="w-4 h-4" />
            New Room
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room: Room) => (
          <div key={room.id} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl">
                <DoorOpen className="w-6 h-6" />
              </div>
              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                room.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}>
                {room.status}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{room.name}</h3>
            <p className="text-sm text-gray-500">Capacity: {room.capacity} Persons</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MenusView({ menus, onDelete, onUpload }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const type = file.name.split('.').pop()?.toLowerCase() as any;
      onUpload(file.name.split('.')[0], type);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Menu Management</h1>
          <p className="text-sm text-gray-500">Upload and manage your restaurant menus</p>
        </div>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-orange-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-orange-700 shadow-lg shadow-orange-200 dark:shadow-none"
        >
          <Upload className="w-4 h-4" />
          Upload Menu
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept=".pdf,.xlsx,.xls,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map((menu: Menu) => (
          <div key={menu.id} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm group">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 text-gray-500 rounded-2xl group-hover:bg-orange-50 dark:group-hover:bg-orange-900/20 group-hover:text-orange-600 transition-colors">
                {menu.type === 'pdf' && <FileIcon className="w-6 h-6" />}
                {menu.type === 'excel' && <FileSpreadsheet className="w-6 h-6" />}
                {menu.type === 'jpg' && <FileImage className="w-6 h-6" />}
                {(!['pdf', 'excel', 'jpg'].includes(menu.type)) && <FileText className="w-6 h-6" />}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white">{menu.name}</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">{menu.type}</p>
              </div>
              <button 
                onClick={() => onDelete(menu.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
              <span className="text-xs text-gray-400">{new Date(menu.uploadedAt).toLocaleDateString()}</span>
              <button className="text-xs font-bold text-orange-600 flex items-center gap-1 hover:underline">
                <Download className="w-3 h-3" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StaffView({ staff, onDelete, onAdd }: any) {
  const [showAdd, setShowAdd] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', role: '', phone: '', email: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newStaff);
    setNewStaff({ name: '', role: '', phone: '', email: '' });
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Staff Management</h1>
          <p className="text-sm text-gray-500">Manage your team and their roles</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-orange-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-orange-700 shadow-lg shadow-orange-200 dark:shadow-none"
        >
          <UserPlus className="w-4 h-4" />
          Add Staff
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Role</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Contact</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Joined</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {staff.map((s: Staff) => (
              <tr key={s.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-900 dark:text-white">{s.name}</div>
                  <div className="text-xs text-gray-400">{s.email}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                    {s.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{s.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{s.joinedAt}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onDelete(s.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] w-full max-w-md border border-gray-100 dark:border-gray-800 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add New Staff</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={newStaff.name}
                  onChange={e => setNewStaff({...newStaff, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g. Ram Bahadur"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Role</label>
                <input 
                  required
                  type="text" 
                  value={newStaff.role}
                  onChange={e => setNewStaff({...newStaff, role: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g. Chef, Waiter"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone</label>
                  <input 
                    required
                    type="tel" 
                    value={newStaff.phone}
                    onChange={e => setNewStaff({...newStaff, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="98XXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email</label>
                  <input 
                    required
                    type="email" 
                    value={newStaff.email}
                    onChange={e => setNewStaff({...newStaff, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="staff@example.com"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200 dark:shadow-none"
                >
                  Add Staff
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
