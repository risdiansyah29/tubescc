Vagrant.configure("2") do |config|
  # Windows/VirtualBox: ubuntu/jammy64
  config.vm.box = ENV.fetch("VAGRANT_BOX", "ubuntu/jammy64")

  nodes = [
    ["database", "192.168.56.11", "VM-Database-TubesCC"],
    ["backend",  "192.168.56.10", "VM-Backend-TubesCC"],
    ["frontend", "192.168.56.12", "VM-Frontend-TubesCC"]
  ]

  nodes.each do |name, ip, vm_name|
    config.vm.define name do |machine|
      machine.vm.hostname = name
      machine.vm.network "private_network", ip: ip

      if name == "backend"
        machine.vm.network "forwarded_port", guest: 5000, host: 5000, auto_correct: true
      end

      if name == "frontend"
        machine.vm.network "forwarded_port", guest: 80, host: 8080, auto_correct: true
      end

      machine.vm.provider "virtualbox" do |vb|
        vb.name = vm_name
        vb.memory = "1024"
        vb.cpus = 1
      end

      machine.vm.provision "shell", inline: <<-SHELL
        set -e
        echo "Installing Ansible on #{name}..."
        sudo apt-get update -y
        sudo apt-get install -y ansible

        echo "Running playbook for #{name}..."
        sudo ansible-playbook /vagrant/infra/playbook.yml -c local -e "target_node=#{name}"
      SHELL
    end
  end
end
