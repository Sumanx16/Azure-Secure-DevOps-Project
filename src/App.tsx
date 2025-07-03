import React, { useState } from 'react';
import { 
  GitBranch, 
  Users, 
  Settings, 
  GitPullRequest, 
  PlayCircle, 
  CheckCircle2, 
  AlertCircle, 
  Shield,
  FileText,
  Home,
  ChevronRight,
  Lock,
  UserCheck,
  GitCommit,
  Timer,
  Eye
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Project Administrator' | 'Contributor';
  avatar: string;
}

interface PullRequest {
  id: number;
  title: string;
  author: User;
  sourceBranch: string;
  targetBranch: string;
  status: 'Active' | 'Completed' | 'Abandoned';
  reviewers: User[];
  buildStatus: 'Succeeded' | 'Failed' | 'Running' | 'Queued';
  createdDate: string;
  description: string;
}

interface Pipeline {
  id: number;
  name: string;
  status: 'Succeeded' | 'Failed' | 'Running' | 'Queued';
  lastRun: string;
  trigger: string;
  environment: string;
}

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedPR, setSelectedPR] = useState<PullRequest | null>(null);

  // Mock data
  const users: User[] = [
    {
      id: '1',
      name: 'Suman Kumar',
      email: 'suman.kumar@company.com',
      role: 'Project Administrator',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '2',
      name: 'Aditya Raj',
      email: 'aditya.raj@company.com',
      role: 'Project Administrator',
      avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '3',
      name: 'Prashant Sharma',
      email: 'prashant.sharma@company.com',
      role: 'Contributor',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '4',
      name: 'Aman Raj',
      email: 'aman.raj@company.com',
      role: 'Contributor',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  const pullRequests: PullRequest[] = [
    {
      id: 1,
      title: 'Add authentication middleware for API endpoints',
      author: users[2],
      sourceBranch: 'feature/auth-middleware',
      targetBranch: 'master',
      status: 'Active',
      reviewers: [users[0], users[1]],
      buildStatus: 'Succeeded',
      createdDate: '2 hours ago',
      description: 'This PR implements JWT-based authentication middleware for all API endpoints to enhance security.'
    },
    {
      id: 2,
      title: 'Update database schema for user roles',
      author: users[3],
      sourceBranch: 'feature/user-roles-db',
      targetBranch: 'master',
      status: 'Active',
      reviewers: [users[0]],
      buildStatus: 'Running',
      createdDate: '4 hours ago',
      description: 'Adds new tables and relationships to support granular user role management.'
    }
  ];

  const pipelines: Pipeline[] = [
    {
      id: 1,
      name: 'SecureDevOpsProject-CI',
      status: 'Succeeded',
      lastRun: '15 minutes ago',
      trigger: 'Pull Request',
      environment: 'Build'
    },
    {
      id: 2,
      name: 'SecureDevOpsProject-CD-Staging',
      status: 'Running',
      lastRun: '30 minutes ago',
      trigger: 'Continuous Deployment',
      environment: 'Staging'
    },
    {
      id: 3,
      name: 'SecureDevOpsProject-CD-Production',
      status: 'Queued',
      lastRun: '2 hours ago',
      trigger: 'Manual',
      environment: 'Production'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Succeeded': return 'text-green-600 bg-green-100';
      case 'Failed': return 'text-red-600 bg-red-100';
      case 'Running': return 'text-blue-600 bg-blue-100';
      case 'Queued': return 'text-yellow-600 bg-yellow-100';
      case 'Active': return 'text-blue-600 bg-blue-100';
      case 'Completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const Navigation = () => (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">SecureDevOpsProject</h1>
              <p className="text-sm text-gray-500">Azure DevOps Demo</p>
            </div>
          </div>
          <div className="flex space-x-6">
            {[
              { id: 'dashboard', label: 'Overview', icon: Home },
              { id: 'repos', label: 'Repos', icon: GitBranch },
              { id: 'pullrequests', label: 'Pull Requests', icon: GitPullRequest },
              { id: 'pipelines', label: 'Pipelines', icon: PlayCircle },
              { id: 'users', label: 'Project Settings', icon: Settings }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setCurrentView(id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Active Pull Requests</p>
                <p className="text-2xl font-bold text-blue-900">{pullRequests.filter(pr => pr.status === 'Active').length}</p>
              </div>
              <GitPullRequest className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Successful Builds</p>
                <p className="text-2xl font-bold text-green-900">12</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Team Members</p>
                <p className="text-2xl font-bold text-purple-900">{users.length}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Pull Requests</h3>
          <div className="space-y-3">
            {pullRequests.slice(0, 3).map((pr) => (
              <div key={pr.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <GitPullRequest className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{pr.title}</p>
                    <p className="text-xs text-gray-500">by {pr.author.name} • {pr.createdDate}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pr.buildStatus)}`}>
                  {pr.buildStatus}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Status</h3>
          <div className="space-y-3">
            {pipelines.map((pipeline) => (
              <div key={pipeline.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <PlayCircle className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{pipeline.name}</p>
                    <p className="text-xs text-gray-500">{pipeline.environment} • {pipeline.lastRun}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pipeline.status)}`}>
                  {pipeline.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const UsersView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Project Settings</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Add Member
          </button>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Groups</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-red-600" />
                <h4 className="font-semibold text-gray-900">Project Administrators</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Full access to project settings, can approve PRs and manage branch policies</p>
              <div className="space-y-2">
                {users.filter(u => u.role === 'Project Administrator').map(user => (
                  <div key={user.id} className="flex items-center space-x-2">
                    <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Contributors</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Can create pull requests, cannot merge directly to master</p>
              <div className="space-y-2">
                {users.filter(u => u.role === 'Contributor').map(user => (
                  <div key={user.id} className="flex items-center space-x-2">
                    <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Branch Policies - Master Branch</h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold text-yellow-800">Protected Branch</span>
            </div>
            <p className="text-sm text-yellow-700 mt-1">Master branch is protected with the following policies:</p>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Require pull request reviews', description: 'At least 1 approval from Project Administrators required', enabled: true },
              { title: 'Require status checks to pass', description: 'Build validation must succeed before merge', enabled: true },
              { title: 'Require branches to be up to date', description: 'Branch must be up to date with master before merge', enabled: true },
              { title: 'Restrict pushes that create files', description: 'Only administrators can push directly to master', enabled: true },
              { title: 'Require signed commits', description: 'All commits must be signed', enabled: false }
            ].map((policy, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{policy.title}</p>
                  <p className="text-sm text-gray-600">{policy.description}</p>
                </div>
                <div className={`w-4 h-4 rounded-full ${policy.enabled ? 'bg-green-500' : 'bg-gray-300'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ReposView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Repository: SecureDevOpsProject</h2>
          <div className="flex space-x-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              Clone
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
              Download
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Branches</h3>
          <div className="space-y-2">
            {[
              { name: 'master', isDefault: true, protection: 'Protected', commits: '156 commits', lastUpdate: '2 hours ago' },
              { name: 'develop', isDefault: false, protection: 'Unprotected', commits: '12 commits ahead', lastUpdate: '4 hours ago' },
              { name: 'feature/auth-middleware', isDefault: false, protection: 'Unprotected', commits: '5 commits ahead', lastUpdate: '2 hours ago' },
              { name: 'feature/user-roles-db', isDefault: false, protection: 'Unprotected', commits: '8 commits ahead', lastUpdate: '4 hours ago' }
            ].map((branch, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <GitBranch className="w-4 h-4 text-gray-600" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{branch.name}</span>
                      {branch.isDefault && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          Default
                        </span>
                      )}
                      {branch.protection === 'Protected' && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                          <Lock className="w-3 h-3" />
                          <span>Protected</span>
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{branch.commits} • Updated {branch.lastUpdate}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded text-sm">
                    Compare
                  </button>
                  {branch.name !== 'master' && (
                    <button className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded text-sm">
                      New PR
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Commits</h3>
          <div className="space-y-2">
            {[
              { hash: 'a1b2c3d', message: 'Add JWT authentication middleware', author: 'Prashant Sharma', time: '2 hours ago', branch: 'feature/auth-middleware' },
              { hash: 'e4f5g6h', message: 'Update user role database schema', author: 'Aman Raj', time: '4 hours ago', branch: 'feature/user-roles-db' },
              { hash: 'i7j8k9l', message: 'Fix CI/CD pipeline configuration', author: 'Suman Kumar', time: '6 hours ago', branch: 'master' },
              { hash: 'm0n1o2p', message: 'Add unit tests for authentication service', author: 'Aditya Raj', time: '8 hours ago', branch: 'develop' }
            ].map((commit, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <GitCommit className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">{commit.message}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{commit.author}</span>
                      <span>•</span>
                      <span className="font-mono text-xs bg-gray-200 px-1 rounded">{commit.hash}</span>
                      <span>•</span>
                      <span>{commit.time}</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {commit.branch}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const PullRequestsView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Pull Requests</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
            New Pull Request
          </button>
        </div>

        <div className="space-y-4">
          {pullRequests.map((pr) => (
            <div key={pr.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <GitPullRequest className="w-5 h-5 text-green-600" />
                    <button
                      onClick={() => setSelectedPR(pr)}
                      className="text-lg font-semibold text-blue-600 hover:text-blue-800"
                    >
                      {pr.title}
                    </button>
                    <span className="text-gray-500">#{pr.id}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <img src={pr.author.avatar} alt={pr.author.name} className="w-5 h-5 rounded-full" />
                      <span>{pr.author.name}</span>
                    </div>
                    <span>wants to merge</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono text-xs">
                      {pr.sourceBranch}
                    </span>
                    <span>into</span>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono text-xs">
                      {pr.targetBranch}
                    </span>
                    <span>•</span>
                    <span>{pr.createdDate}</span>
                  </div>

                  <p className="text-gray-700 mb-3">{pr.description}</p>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <UserCheck className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {pr.reviewers.length} reviewer{pr.reviewers.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex -space-x-1">
                      {pr.reviewers.map((reviewer) => (
                        <img
                          key={reviewer.id}
                          src={reviewer.avatar}
                          alt={reviewer.name}
                          className="w-6 h-6 rounded-full border-2 border-white"
                          title={reviewer.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(pr.status)}`}>
                    {pr.status}
                  </span>
                  <div className="flex items-center space-x-1">
                    {pr.buildStatus === 'Succeeded' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                    {pr.buildStatus === 'Failed' && <AlertCircle className="w-4 h-4 text-red-600" />}
                    {pr.buildStatus === 'Running' && <Timer className="w-4 h-4 text-blue-600" />}
                    <span className={`text-sm font-medium ${getStatusColor(pr.buildStatus).split(' ')[0]}`}>
                      {pr.buildStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPR && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Pull Request Details</h3>
            <button
              onClick={() => setSelectedPR(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Required Checks</h4>
              <div className="space-y-2">
                {[
                  { name: 'Build validation', status: 'Succeeded', required: true },
                  { name: 'Code quality scan', status: 'Succeeded', required: true },
                  { name: 'Security scan', status: 'Succeeded', required: false },
                  { name: 'Unit tests', status: 'Succeeded', required: true }
                ].map((check, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      {check.status === 'Succeeded' ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className="text-sm font-medium">{check.name}</span>
                      {check.required && (
                        <span className="bg-red-100 text-red-800 px-1 py-0.5 rounded text-xs">Required</span>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">{check.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Reviewer Approval</h4>
              <div className="space-y-2">
                {selectedPR.reviewers.map((reviewer) => (
                  <div key={reviewer.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <img src={reviewer.avatar} alt={reviewer.name} className="w-6 h-6 rounded-full" />
                      <span className="text-sm font-medium">{reviewer.name}</span>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-1 py-0.5 rounded">
                        {reviewer.role}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-orange-600">Review Requested</span>
                      <Timer className="w-4 h-4 text-orange-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">Merge Requirements</span>
              </div>
              <ul className="text-sm text-blue-700 space-y-1 ml-7">
                <li>• At least 1 approval from Project Administrators required</li>
                <li>• All required status checks must pass</li>
                <li>• Branch must be up to date with master</li>
                <li>• No merge conflicts</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-3">
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
                Close Pull Request
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 opacity-50 cursor-not-allowed">
                Merge Pull Request
              </button>
              <p className="text-xs text-gray-500 flex items-center">
                Merge disabled - Awaiting reviewer approval
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const PipelinesView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Pipelines</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            New Pipeline
          </button>
        </div>

        <div className="space-y-4">
          {pipelines.map((pipeline) => (
            <div key={pipeline.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <PlayCircle className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{pipeline.name}</h3>
                    <p className="text-sm text-gray-600">{pipeline.environment} • {pipeline.trigger}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(pipeline.status)}`}>
                    {pipeline.status}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    View Details
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last run: {pipeline.lastRun}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">Trigger: {pipeline.trigger}</span>
                    {pipeline.status === 'Queued' && pipeline.environment === 'Production' && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                        <Lock className="w-3 h-3" />
                        <span>Manual Approval Required</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Security & Gates</h3>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Build Pipeline (CI)</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Trigger: Pull Request to master</span>
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Security: Code quality scan</span>
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Security: Dependency vulnerability check</span>
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Release Pipeline (CD)</h4>
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded p-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Staging Environment</span>
                  <span className="text-green-600">Automatic Deployment</span>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Production Environment</span>
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-yellow-600" />
                    <span className="text-yellow-600">Manual Approval Gate</span>
                  </div>
                </div>
                <p className="text-xs text-yellow-700 mt-1">Requires approval from Project Administrators</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Security Policies</h4>
            <div className="space-y-2">
              {[
                'Only Project Administrators can edit pipeline definitions',
                'All deployments require build validation to pass',
                'Production deployments require manual approval',
                'Service connections are restricted to administrators',
                'Pipeline logs are audited and retained for 90 days'
              ].map((policy, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>{policy}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'users': return <UsersView />;
      case 'repos': return <ReposView />;
      case 'pullrequests': return <PullRequestsView />;
      case 'pipelines': return <PipelinesView />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderView()}
      </main>
    </div>
  );
}

export default App;